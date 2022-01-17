import { useCallback, useEffect, useRef, useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import RecordRTC from "recordrtc";
import { RecorderRecording } from "./components/RecorderRecording/RecorderRecording";
import { StartRecording } from "./components/RecorderStart/StartRecording";
import { FinishedRecording } from "./components/RecorderFinished/FinishedRecording";
import { transcribeAudio } from "../../api/SpeechAPI";
import { TranscriptDetails } from "./components/TranscriptDetails/TranscriptDetails";
import { audioRecorderOptions, mediaStreamConstraints } from "./consts";
import { DurationDisplay } from "../../components/DurationDisplay/DurationDisplay";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  }),
);

// TODO: Check if you can use the state from the RecordRTC recorder
enum RecorderState {
  Idle = "IDLE",
  Recording = "RECORDING",
  Paused = "PAUSED",
  Transcribing = "TRANSCRIBING",
  Transcribed = "TRANSCIRBED",
  DisplayTranscript = "DISPLAYTRANSCRIPT",
}

export const RecorderPage = () => {
  const [recordingState, setRecordingState] = useState<RecorderState>(
    RecorderState.Idle,
  );
  const [transcript, setTranscript] = useState<string>("");
  const [showRecordingDuration, setShowRecordingDuration] =
    useState<boolean>(false);

  const [recordingDurationInSeconds, setRecordingDurationInSeconds] =
    useState<number>(0);
  const increment = useRef<NodeJS.Timeout>();

  const microphone = useRef<MediaStream>();
  const [recorder, setRecorder] = useState<RecordRTC | null>(null);
  const [blob, setBlob] = useState<Blob>();

  useEffect(() => {
    async function asyncTranscribe() {
      if (blob) {
        const response = await transcribeAudio(
          blob,
          "127121df-e3e5-4d74-a8d7-cf48c45e6460",
          "ResidentialCare",
        );
        setTranscript(response.data.transcript);
        setRecordingState(RecorderState.Transcribed);
      }
    }

    asyncTranscribe();
  }, [blob]);

  const startRecorder = () => {
    increment.current = setInterval(() => {
      setRecordingDurationInSeconds(prevTimer => prevTimer + 1);
    }, 1000);

    navigator.mediaDevices.getUserMedia(mediaStreamConstraints).then(stream => {
      microphone.current = stream;
      const newRecorder = new RecordRTC(stream, audioRecorderOptions);
      setRecorder(newRecorder);
      newRecorder.startRecording();
      setShowRecordingDuration(true);
      setRecordingState(RecorderState.Recording);
    });
  };

  const pauseRecorder = () => {
    if (increment.current !== undefined) {
      clearInterval(increment.current);
    }

    recorder?.pauseRecording();

    setRecordingState(RecorderState.Paused);
  };

  const resumeRecorder = () => {
    increment.current = setInterval(() => {
      setRecordingDurationInSeconds(prevTimer => prevTimer + 1);
    }, 1000);

    recorder?.resumeRecording();

    setRecordingState(RecorderState.Recording);
  };

  const stopRecorder = () => {
    if (increment.current !== undefined) {
      clearInterval(increment.current);
    }

    recorder?.stopRecording(() => {
      setBlob(recorder.getBlob());
      if (microphone.current) {
        const tracks = microphone.current.getTracks();
        tracks.forEach(function stopTrack(track) {
          track.stop();
        });
        microphone.current = undefined;
      }
      recorder.reset();
    });

    setRecordingState(RecorderState.Transcribing);
  };

  const closeRecorder = () => {
    setShowRecordingDuration(false);
    setRecordingState(RecorderState.DisplayTranscript);
    if (transcript === "") {
      setTranscript(
        "We could not get any transcript from the audio, please try again",
      );
    }
  };

  const resetRecorder = () => {
    // can we do this cleaner?
    setRecordingState(RecorderState.Idle);
    setRecordingDurationInSeconds(0);
    setShowRecordingDuration(false);
    setBlob(undefined);
    setTranscript("");
  };

  const onUploadAudio = useCallback(event => {
    const uploadedFile = event.target.files[0];
    setBlob(uploadedFile);
    setShowRecordingDuration(false);
    setRecordingState(RecorderState.Transcribing);
  }, []);

  const started = recordingState !== RecorderState.Idle;
  const isPaused = recordingState === RecorderState.Paused;
  const isRecording = recordingState === RecorderState.Recording;
  const isTranscribing = recordingState === RecorderState.Transcribing;
  const isTranscribed = recordingState === RecorderState.Transcribed;
  const isDisplayTranscript =
    recordingState === RecorderState.DisplayTranscript;

  const classes = useStyles();
  return (
    <div className={classes.root}>
      {!started && (
        <StartRecording
          startRecorder={startRecorder}
          handleUpload={onUploadAudio}
        />
      )}
      {showRecordingDuration && (
        <>
          <DurationDisplay durationInSeconds={recordingDurationInSeconds} />
        </>
      )}
      {(isRecording || isPaused) && (
        <RecorderRecording
          pauseRecorder={pauseRecorder}
          resumeRecorder={resumeRecorder}
          stopRecorder={stopRecorder}
          isRecording={isRecording}
          isPaused={isPaused}
        />
      )}
      {(isTranscribing || isTranscribed) && (
        <FinishedRecording
          finishedRecording={closeRecorder}
          isProcessing={isTranscribing}
          isProcessed={isTranscribed}
        />
      )}

      {isDisplayTranscript && transcript && (
        <TranscriptDetails
          transcript={transcript}
          closeRecording={resetRecorder}
        />
      )}
    </div>
  );
};
