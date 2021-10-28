import RecordRTC, { Options } from "recordrtc";

export const audioRecorderOptions: Options = {
  type: "audio",
  mimeType: "audio/wav",
  recorderType: RecordRTC.StereoAudioRecorder,
  numberOfAudioChannels: 1,
  bufferSize: 16384, // TODO: why do we do this?
  desiredSampRate: 16000,
  audioBitsPerSecond: 128000, // todo: why do we do this?
  disableLogs: true,
};

export const mediaStreamConstraints: MediaStreamConstraints = {
  video: false,
  audio: {
    echoCancellation: false,
  },
};
