using MyOwnWeb.Interfaces;

namespace MyOwnWeb.DTOs
{
    public class AboutMeDTO : IId
    {
        public int Id { get; set; }
        public required string EnTitle { get; set; }
        public string? EsTitle { get; set; }
        public required string EnDescription { get; set; }
        public string? EsDescription { get; set; }
        public required string Tag { get; set; }
        public List<string>? Pictures { get; set; }
    }
}
