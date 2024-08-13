using Microsoft.EntityFrameworkCore;
using WebApi8_CarsApp.Models;

namespace WebApi8_CarsApp.Data
{
    public static class SeedData
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MakerModel>().HasData(
                new MakerModel { Id = 1, Nome = "Aston Martin" },
                new MakerModel { Id = 2, Nome = "Audi" },
                new MakerModel { Id = 3, Nome = "BMW" },
                new MakerModel { Id = 4, Nome = "BYD" },
                new MakerModel { Id = 5, Nome = "CAOA Chery" },
                new MakerModel { Id = 6, Nome = "Chevrolet" },
                new MakerModel { Id = 7, Nome = "Citroën" },
                new MakerModel { Id = 8, Nome = "Effa" },
                new MakerModel { Id = 9, Nome = "Ferrari" },
                new MakerModel { Id = 10, Nome = "Fiat" },
                new MakerModel { Id = 11, Nome = "Ford" },
                new MakerModel { Id = 12, Nome = "Foton" },
                new MakerModel { Id = 13, Nome = "GWM" },
                new MakerModel { Id = 14, Nome = "Honda" },
                new MakerModel { Id = 15, Nome = "Hyundai" },
                new MakerModel { Id = 16, Nome = "Iveco" },
                new MakerModel { Id = 17, Nome = "JAC" },
                new MakerModel { Id = 18, Nome = "Jaguar" },
                new MakerModel { Id = 19, Nome = "Jeep" },
                new MakerModel { Id = 20, Nome = "Kia" },
                new MakerModel { Id = 21, Nome = "Lamborghini" },
                new MakerModel { Id = 22, Nome = "Land Rover" },
                new MakerModel { Id = 23, Nome = "Lexus" },
                new MakerModel { Id = 24, Nome = "Maserati" },
                new MakerModel { Id = 25, Nome = "McLaren" },
                new MakerModel { Id = 26, Nome = "Mercedes-AMG" },
                new MakerModel { Id = 27, Nome = "Mercedes-Benz" },
                new MakerModel { Id = 28, Nome = "Mini" },
                new MakerModel { Id = 29, Nome = "Mitsubishi" },
                new MakerModel { Id = 30, Nome = "Neta" },
                new MakerModel { Id = 31, Nome = "Nissan" },
                new MakerModel { Id = 32, Nome = "Peugeot" },
                new MakerModel { Id = 33, Nome = "Porsche" },
                new MakerModel { Id = 34, Nome = "RAM" },
                new MakerModel { Id = 35, Nome = "Renault" },
                new MakerModel { Id = 36, Nome = "Rolls-Royce" },
                new MakerModel { Id = 37, Nome = "Seres" },
                new MakerModel { Id = 38, Nome = "Subaru" },
                new MakerModel { Id = 39, Nome = "Suzuki" },
                new MakerModel { Id = 40, Nome = "Toyota" },
                new MakerModel { Id = 41, Nome = "Volkswagen" },
                new MakerModel { Id = 42, Nome = "Volvo" }
            );

            modelBuilder.Entity<CarTypeModel>().HasData(
                new CarTypeModel { Id = 1, Nome = "Hatch" },
                new CarTypeModel { Id = 2, Nome = "Sedan" },
                new CarTypeModel { Id = 3, Nome = "SUV" },
                new CarTypeModel { Id = 4, Nome = "Picape" },
                new CarTypeModel { Id = 5, Nome = "Crossover" },
                new CarTypeModel { Id = 6, Nome = "Perua" },
                new CarTypeModel { Id = 7, Nome = "Minivan" },
                new CarTypeModel { Id = 8, Nome = "Esportivo" },
                new CarTypeModel { Id = 9, Nome = "Furgão" }
            );
        }
    }
}
