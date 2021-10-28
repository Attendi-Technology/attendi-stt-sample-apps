import { ITranscript } from "./models/ITranscript";
import { API } from "./APIUtils";

const convertBlobToBase64 = (blob: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const base64String = reader.result?.toString();
      if (base64String) {
        resolve(base64String.substr(base64String.indexOf(",") + 1));
      } else {
        resolve(reader.result);
      }
    };
    reader.readAsDataURL(blob);
  });

export async function transcribeAudio(blob: Blob) {
  const blobBase64 = await convertBlobToBase64(blob);

  const body = {
    audio: blobBase64,
  };

  return API.post<ITranscript>("/v1/speech/transcribe", body);
}
