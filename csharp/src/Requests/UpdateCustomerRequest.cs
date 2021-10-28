namespace STTApiExampleApp.Requests
{
    public class UpdateCustomerRequest
    {
        public UpdateCustomerRequest(string name)
        {
            Name = name;
        }

        public string Name { get; private set; }
    }
}
