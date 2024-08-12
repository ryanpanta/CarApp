namespace WebApi8_CarsApp.DTO.Car
{
    public class CarEditDTO
    {
        public Guid Id { get; set; }
        public string Modelo { get; set; } = string.Empty;
        public int FabricanteId { get; set; }
        public int TipoVeiculoId { get; set; }
        public int Ano { get; set; }
    }
}
