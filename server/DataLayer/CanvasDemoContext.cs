using Entities.Concrete;
using Microsoft.EntityFrameworkCore;

namespace DataLayer
{
    public class CanvasDemoContext : DbContext
    {
        public CanvasDemoContext()
        {

        }

        public CanvasDemoContext(DbContextOptions<CanvasDemoContext> options) : base(options) 
        { 
        
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Canvas> Canvases { get; set; }
        public DbSet<Element> Elements { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        { 
            base.OnModelCreating(modelBuilder); 
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) 
        { 
            if (!optionsBuilder.IsConfigured) 
            {
                optionsBuilder.UseSqlServer("Server=localhost;Database=CANVASDEMO;Trusted_Connection=True;");

            }
        }
    }
}