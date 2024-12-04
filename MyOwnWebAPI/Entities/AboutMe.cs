using Microsoft.EntityFrameworkCore;
using MyOwnWeb.Interfaces;

namespace MyOwnWeb.Entities
{
    public class AboutMe : IId
    {
        public int Id { get; set; }
        public required string EnTitle { get; set; }
        public string? EsTitle { get; set; }
        public required string EnDescription { get; set; }
        public string? EsDescription { get; set; }
        public required string Tag { get; set; }
        [Unicode(false)]
        public List<string> Pictures { get; set; } = new List<string>();
    }
}
