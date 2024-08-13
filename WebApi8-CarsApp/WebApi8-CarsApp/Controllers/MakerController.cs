using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi8_CarsApp.DTO.Maker;
using WebApi8_CarsApp.Models;
using WebApi8_CarsApp.Services.Maker;

namespace WebApi8_CarsApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MakerController : ControllerBase
    {
        private readonly IMakerInterface _makerInterface;   
        public MakerController(IMakerInterface makerInterface)
        {
            _makerInterface = makerInterface;
        }

        [HttpGet]
        public async Task<ActionResult<ResponseModel<List<MakerModel>>>> GetAll()
        {
            var makers = await _makerInterface.GetAll();
            return Ok(makers);
        }

        [HttpPost]
        public async Task<ActionResult<ResponseModel<MakerModel>>> Register(MakerRegisterDTO makerRegister)
        {
            var maker = await _makerInterface.Register(makerRegister);
            return Ok(maker);
        }

        [HttpPut]
        public async Task<ActionResult<ResponseModel<MakerModel>>> Edit(MakerEditDTO makerEdit)
        {
            var maker = await _makerInterface.Edit(makerEdit);
            return Ok(maker);
        }

        [HttpDelete]
        public async Task<ActionResult<ResponseModel<MakerModel>>> Delete(int id)
        {
            var maker = await _makerInterface.Delete(id);
            return Ok(maker);
        }
    }
}
