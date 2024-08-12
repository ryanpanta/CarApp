namespace WebApi8_CarsApp.Models
{
    public class CarModel
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Modelo { get; set; } = string.Empty;
        public MakerModel Fabricante { get; set; } = new MakerModel();
        public CarTypeModel TipoVeiculo { get; set; } = new CarTypeModel();
        public int Ano { get; set; }
        public DateTime DataCadastro { get; set; } = DateTime.Now;
        public UserModel Usuario { get; set; } = new UserModel();

    }
}
