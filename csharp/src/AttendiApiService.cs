using STTApiExampleApp.Requests;
using System;
using System.IO;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace STTApiExampleApp
{
    class AttendiApiService
    {
        private HttpClient _client;
        private const string _BaseApiUrl = "https://sandbox.api.attendi.nl";

        public AttendiApiService(HttpClient client)
        {
            _client = client;
        }

        public async Task TranscribeAudioAsync()
        {
            byte[] audioData = File.ReadAllBytes("test.wav");
            var config = new TranscribeConfig("ResidentialCare");
            var metadata = new TranscribeMetadata(".NET Console App");
            var request = new TranscribeRequest(audioData, "127121df-e3e5-4d74-a8d7-cf48c45e6460", config, metadata);

            // PostAsJson will take care of encoding the bytes as Base64
            var response = await _client.PostAsJsonAsync($"{_BaseApiUrl }/v1/speech/transcribe", request);
            var responseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine(responseBody);
        }

        public async Task CreateCustomer(string customerName, string externalId)
        {
            var request = new CreateCustomerRequest(customerName, externalId);
            var response = await _client.PostAsJsonAsync($"{_BaseApiUrl }/v1/customers", request);
            var responseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine(responseBody);
        }

        public async Task UpdateCustomer(string customerName, int attendiCustomerId)
        {
            var request = new UpdateCustomerRequest(customerName);

            string jsonString = JsonSerializer.Serialize(request);
            // Note the mediaType, it's for merge patches
            var httpContent = new StringContent(jsonString, Encoding.UTF8, "application/merge-patch+json");

            var response = await _client.PatchAsync($"{_BaseApiUrl }/v1/customers/{attendiCustomerId}", httpContent);
            var responseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine(responseBody);
        }

        public async Task UpsertCustomer(string customerName, string externalId)
        {
            var request = new UpsertCustomerRequest(customerName);

            string jsonString = JsonSerializer.Serialize(request);
            var httpContent = new StringContent(jsonString, Encoding.UTF8, "application/json");

            var response = await _client.PutAsync($"{_BaseApiUrl }/v1/customers/{externalId}", httpContent);
            var responseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine(responseBody);
        }

        public async Task GetCustomerById(int attendiCustomerId)
        {
            var response = await _client.GetAsync($"{_BaseApiUrl }/v1/customers/{attendiCustomerId}");
            var responseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine(responseBody);
        }

        public async Task GetCustomerByExternalId(string externalId)
        {
            var response = await _client.GetAsync($"{_BaseApiUrl }/v1/customers?externalId={externalId}");
            var responseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine(responseBody);
        }

        public async Task GetCustomers()
        {
            var response = await _client.GetAsync($"{_BaseApiUrl }/v1/customers");
            var responseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine(responseBody);
        }
    }
}
