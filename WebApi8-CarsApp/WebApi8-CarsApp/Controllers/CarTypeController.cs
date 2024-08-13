using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi8_CarsApp.DTO.CarType;
using WebApi8_CarsApp.Models;
using WebApi8_CarsApp.Services.Car;
using WebApi8_CarsApp.Services.CarType;
using WebApi8_CarsApp.Services.Maker;

namespace WebApi8_CarsApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarTypeController : ControllerBase
    {
        private readonly ICarTypeInterface _carTypeInterface;
        public CarTypeController(ICarTypeInterface carTypeInterface)
        {
            _carTypeInterface = carTypeInterface;
        }

        [HttpGet]
        public async Task<ActionResult<ResponseModel<List<CarTypeModel>>>> GetAll()
        {
            var types = await _carTypeInterface.GetAll();
            return Ok(types);
        }

        [HttpPost]
        public async Task<ActionResult<ResponseModel<CarTypeModel>>> Register(CarTypeRegisterDTO carTypeRegister)
        {
            var type = await _carTypeInterface.Register(carTypeRegister);
            return Ok(type);
        }

        [HttpPut]
        public async Task<ActionResult<ResponseModel<CarTypeModel>>> Edit(CarTypeEditDTO carTypeEdit)
        {
            var type = await _carTypeInterface.Edit(carTypeEdit);
            return Ok(type);
        }

        [HttpDelete]
        public async Task<ActionResult<ResponseModel<CarTypeModel>>> Delete(int id)
        {
            var type = await _carTypeInterface.Delete(id);
            return Ok(type);
        }
    }
}
