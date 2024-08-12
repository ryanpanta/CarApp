using WebApi8_CarsApp.Models;

namespace WebApi8_CarsApp.DTO.Car
{
    public class CarRegisterDTO
    {
        public string Modelo { get; set; } = string.Empty;
        public int FabricanteId { get; set; } 
        public int TipoVeiculoId { get; set; }
        public int Ano { get; set; }
    }
}
