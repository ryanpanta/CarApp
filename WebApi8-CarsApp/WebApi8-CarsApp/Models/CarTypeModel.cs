using System.Text.Json.Serialization;

namespace WebApi8_CarsApp.Models
{
    public class CarTypeModel
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        [JsonIgnore]
        public ICollection<CarModel> Carros { get; set; } = [];
    }
}
