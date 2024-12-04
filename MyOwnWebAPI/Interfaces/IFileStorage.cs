namespace MyOwnWeb.Interfaces
{
    public interface IFileStorage
    {
        Task<string> Store(string container, IFormFile file);
        Task Remove(string? link, string container);
        async Task<string> Edit(string? link, string container, IFormFile file)
        {
            await Remove(link, container);
            return await Store(container, file);
        }
    }
}
