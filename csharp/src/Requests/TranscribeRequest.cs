namespace STTApiExampleApp.Requests
{
    public class TranscribeRequest
    {
        public TranscribeRequest(byte[] audio)
        {
            Audio = audio;
        }
        public byte[] Audio { get; private set; }
    }
}
