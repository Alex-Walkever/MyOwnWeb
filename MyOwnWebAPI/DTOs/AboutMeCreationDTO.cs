namespace MyOwnWeb.DTOs
{
    public class AboutMeCreationDTO
    {
        public required string EnTitle { get; set; }
        public string? EsTitle { get; set; }
        public required string EnDescription { get; set; }
        public string? EsDescription { get; set; }
        public required string Tag { get; set; }
        public List<IFormFile>? Pictures { get; set; }
    }
}
