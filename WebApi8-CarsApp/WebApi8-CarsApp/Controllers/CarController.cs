using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi8_CarsApp.DTO.Car;
using WebApi8_CarsApp.Models;
using WebApi8_CarsApp.Services.Car;

namespace WebApi8_CarsApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly ICarInterface _carInterface;
        public CarController(ICarInterface carInterface)
        {
            _carInterface = carInterface;
        }

        [HttpGet]
        public async Task<ActionResult<ResponseModel<List<CarModel>>>> GetAll()
        {
            var cars = await _carInterface.GetAll();
            return Ok(cars);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ResponseModel<CarModel>>> GetById([FromRoute] Guid id)
        {
            var car = await _carInterface.GetById(id);
            return Ok(car);
        }

        [HttpPost]
        public async Task<ActionResult<ResponseModel<CarModel>>> Register([FromBody] CarRegisterDTO carRegisterDTO)
        {
            var cars = await _carInterface.Register(carRegisterDTO);
            return Ok(cars);
        }

        [HttpPut]
        public async Task<ActionResult<ResponseModel<CarModel>>> Edit([FromBody] CarEditDTO newCar)
        {
            var car = await _carInterface.Edit(newCar);
            return Ok(car);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ResponseModel<CarModel>>> Delete([FromRoute] Guid id)
        {
            var car = await _carInterface.Delete(id);
            return Ok(car);
        }
    }
}
