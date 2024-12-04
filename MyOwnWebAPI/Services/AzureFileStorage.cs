using MyOwnWeb.Interfaces;

namespace MyOwnWeb.Services
{
    public class AzureFileStorage : IFileStorage
    {
        private string connectionString;
        public AzureFileStorage(IConfiguration configuration)
        {
            connectionString = configuration.GetConnectionString("AzureStorageConnection");
        }
    }
}
