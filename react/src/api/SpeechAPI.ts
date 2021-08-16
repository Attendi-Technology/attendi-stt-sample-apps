import API from './APIUtils';
import { ITranscript } from '../types/IRecording';

export async function transcribeAudio(blob: Blob) {
    let blobBase64 = await convertBlobToBase64(blob);

    const body = {
        audio: blobBase64
    }

    return API.post<ITranscript>('/v1/speech/transcribe',
        body,
        {
            headers: {
                "Content-Type": "application/json",
            },
        });
}

const convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        let base64String = reader.result?.toString();
        console.log(base64String)
        if (base64String) {
            resolve(base64String.substr(base64String.indexOf(',') + 1));
        }
        else {
            resolve(reader.result);
        }
    };
    reader.readAsDataURL(blob);
});