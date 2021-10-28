using System.Net.Http;
using System.Threading.Tasks;

namespace STTApiExampleApp
{
    class Program
    {
        private static readonly HttpClient client = new HttpClient();

        static async Task Main()
        {
            // set the API key
            client.DefaultRequestHeaders.Add("x-API-key", "<YOUR_API_KEY>");

            var attendiApiService = new AttendiApiService(client);

            // read your audio file
            await attendiApiService.TranscribeAudioAsync();

            // create a customer
            await attendiApiService.CreateCustomer("MyCustomer", "1A2BC");
            // retrieve customer by attendi id, NOTE that this is just an example value and the customer might not exist for your tenant
            await attendiApiService.GetCustomerById(1);
            // retrieve customer by external id
            await attendiApiService.GetCustomerByExternalId("1A2BC");
            // update customer
            await attendiApiService.UpdateCustomer("MyUpdatedCustomer", 1);
            // upsert customer
            await attendiApiService.UpsertCustomer("MyUpsertedCustomer", "2A2BC");
            // get all your customers
            await attendiApiService.GetCustomers();
        }
    }
}
