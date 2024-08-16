using System.Text.Json.Serialization;

namespace WebApi8_CarsApp.Models
{
    public class UserModel
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        [JsonIgnore]
        public string Senha { get; set; } = string.Empty;
        public DateTime DataCadastro { get; set; } = DateTime.Now;
        [JsonIgnore]
        public ICollection<CarModel> Carros { get; set; } = [];

    }
}
