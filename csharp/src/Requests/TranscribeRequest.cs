using System.ComponentModel.DataAnnotations;

namespace STTApiExampleApp.Requests
{
    public class TranscribeRequest
    {
        public TranscribeRequest(byte[] audio, string userId, TranscribeConfig transcribeConfig, TranscribeMetadata metadata = null)
        {
            Audio = audio;
            UserId = userId;
            Config = transcribeConfig;
            Metadata = metadata;
        }

        [Required]
        public byte[] Audio { get; private set; }
        [Required]
        public string UserId { get; private set; }
        [Required]
        public TranscribeConfig Config { get; private set; }
        public TranscribeMetadata Metadata { get; private set; }
    }

    public class TranscribeConfig
    {
        [Required]
        public string Model { get; private set; }

        public TranscribeConfig(string model)
        {
            Model = model;
        }
    }

    public class TranscribeMetadata
    {
        public string UserAgent { get; private set; }

        public TranscribeMetadata(string userAgent)
        {
            UserAgent = userAgent;
        }
    }
}
