namespace STTApiExampleApp.Requests
{
    public class UpsertCustomerRequest
    {
        public UpsertCustomerRequest(string name)
        {
            Name = name;
        }

        public string Name { get; private set; }
    }
}
