using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MyOwnWeb.Entities;

namespace MyOwnWeb
{
    public class AppDBContext : IdentityDbContext
    {
        public AppDBContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

        public DbSet<Experience> Experiences { get; set; }
        public DbSet<AboutMeDescription> AboutMeDescriptions { get; set; }
    }
}
