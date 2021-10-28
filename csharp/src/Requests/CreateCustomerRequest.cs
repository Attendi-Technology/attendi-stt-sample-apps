namespace STTApiExampleApp.Requests
{
    public class CreateCustomerRequest
    {
        public CreateCustomerRequest(string name, string externalId)
        {
            Name = name;
            ExternalId = externalId;
        }

        public string Name { get; private set; }
        public string ExternalId { get; private set; }
    }
}
