namespace MyOwnWeb.Entities
{
    public class Experience
    {
        public int Id { get; set; }
        public required string EnTitle { get; set; }
        public string? EsTitle { get; set; }
        public required string EnResume { get; set; }
        public string? EsResume { get; set; }
        public required DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public required string EnProject { get; set; }
        public string? EsProject { get; set; }
        public required string EnSkills { get; set; }
        public string? EsSkills { get; set; }
        public string? UrlToProject { get; set; }
        public bool CurrentWork { get; set; }
    }
}
