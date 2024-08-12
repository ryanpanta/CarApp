using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using WebApi8_CarsApp.Models;

namespace WebApi8_CarsApp.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options ) : base(options)
        {
            
        }

        public DbSet<UserModel> Usuarios { get; set; }
        public DbSet<CarModel> Carros { get; set; }
        public DbSet<MakerModel> Fabricantes {  get; set; }
        public DbSet<CarTypeModel> Tipos { get; set; }

    }
}
