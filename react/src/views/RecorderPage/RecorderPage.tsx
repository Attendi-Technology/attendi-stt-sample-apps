import { useEffect, useRef, useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import RecordRTC, { Options } from "recordrtc";
import { useWakeLock } from "react-screen-wake-lock";
import { RecorderRecording } from "./components/RecorderRecording/RecorderRecording";
import { StartRecording } from "./components/RecorderStart/StartRecording";
import { FinishedRecording } from "./components/RecorderFinished/FinishedRecording";
import { transcribeAudio } from "../../api/SpeechAPI";
import { TranscriptForm } from "./components/TranscriptForm/TranscriptForm";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      textAlign: "center",
      "& h1": {
        margin: "50px 0 50px 0",
        color: "#2F3539",
        fontSize: 37,
        fontWeight: "bold",
      },
    },
    timer: {
      color: "#2F3539",
      fontSize: 37,
      marginBottom: 60,
    },
    offlineText: {
      wordWrap: "break-word",
      textAlign: "center",
      flex: "0 0 120px",
    },
  }),
);

const mediaStreamConstraints: MediaStreamConstraints = {
  video: false,
  audio: {
    echoCancellation: false,
  },
};

const getAudioRecorderOptions = (): Options => ({
  type: "audio",
  mimeType: "audio/wav",
  recorderType: RecordRTC.StereoAudioRecorder,
  timeSlice: 100,
  numberOfAudioChannels: 2,
  bufferSize: 16384,
  desiredSampRate: 16000,
  audioBitsPerSecond: 128000,
  disableLogs: true,
});

export const RecorderPage = () => {
  const [recordingState, setRecordingState] = useState<string>();
  const [transcript, setTranscript] = useState<string>();

  const [timer, setTimer] = useState(0);
  const increment = useRef<NodeJS.Timeout>();

  const { isSupported, request, release } = useWakeLock();

  const microphone = useRef<MediaStream>();
  const [recorder, setRecorder] = useState<RecordRTC | null>(null);
  const [blob, setBlob] = useState<Blob>();

  useEffect(() => {
    async function asyncTranscribe() {
      if (blob) {
        const response = await transcribeAudio(blob);
        setTranscript(response.data.transcript);
        setRecordingState("transcribed");

        if (isSupported) {
          release();
        }
      }
    }

    asyncTranscribe();
  }, [blob, isSupported, release]);

  const formatTime = () => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = Math.floor(timer / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  const startRecorder = () => {
    increment.current = setInterval(() => {
      setTimer(prevTimer => prevTimer + 1);
    }, 1000);

    if (isSupported) {
      request();
    }

    navigator.mediaDevices.getUserMedia(mediaStreamConstraints).then(stream => {
      microphone.current = stream;
      const options = getAudioRecorderOptions();
      const newRecorder = new RecordRTC(stream, options);
      setRecorder(newRecorder);
      newRecorder.startRecording();
      setRecordingState("recording");
    });
  };

  const pauseRecorder = () => {
    if (increment.current !== undefined) {
      clearInterval(increment.current);
    }

    recorder?.pauseRecording();

    setRecordingState("paused");
  };

  const resumeRecorder = () => {
    increment.current = setInterval(() => {
      setTimer(prevTimer => prevTimer + 1);
    }, 1000);

    recorder?.resumeRecording();

    setRecordingState("recording");
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

    setRecordingState("uploading");
  };

  const closeRecorder = () => {
    setRecordingState("closed");
  };

  const resetRecorder = () => {
    // can we do this cleaner?
    setRecordingState(undefined);
    setTimer(0);
    setBlob(undefined);
    setTranscript(undefined);
  };

  const started = recordingState !== undefined;
  const isPaused = recordingState === "paused";
  const isRecording = recordingState === "recording";
  const isTranscribing = recordingState === "transcribing";
  const isTranscribed = recordingState === "transcribed";
  const showTranscript = recordingState === "closed";

  const classes = useStyles();

  return (
    <div className={classes.root}>
      {!started && <StartRecording startRecorder={startRecorder} />}
      {started && !showTranscript && (
        <>
          <p className={classes.timer}>{formatTime()}</p>
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

      {showTranscript && transcript && (
        <TranscriptForm
          transcript={transcript}
          closeRecording={resetRecorder}
        />
      )}
    </div>
  );
};
