using Azure.Storage.Blobs;
using MyOwnWeb.Interfaces;
using Azure.Storage.Blobs.Models;

namespace MyOwnWeb.Services
{
    public class AzureFileStorage : IFileStorage
    {
        private string connectionString;
        public AzureFileStorage(IConfiguration configuration)
        {
            connectionString = configuration.GetConnectionString("AzureStorageConnection");
        }

        public async Task<string> Store(string container, IFormFile file)
        {
            var client = new BlobContainerClient(connectionString, container);
            await client.CreateIfNotExistsAsync();
            client.SetAccessPolicy(PublicAccessType.Blob);

            var extension = Path.GetExtension(file.Name);
            var fileName = $"{Guid.NewGuid()}{extension}";
            var blob = client.GetBlobClient(fileName);

            var blobHttpHeaders = new BlobHttpHeaders();
            blobHttpHeaders.ContentType = file.ContentType;

            await blob.UploadAsync(file.OpenReadStream(), blobHttpHeaders);
            return blob.Uri.ToString();
        }

        public async Task Remove(string? link, string conteiner)
        {
            if(string.IsNullOrWhiteSpace(link))
                return;

            var client = new BlobContainerClient(connectionString, conteiner);
            await client.CreateIfNotExistsAsync();
            var fileName = Path.GetFileName(link);
            var blob = client.GetBlobClient(fileName);
            await blob.DeleteIfExistsAsync();
        }
    }
}
