using WebApi8_CarsApp.DTO.CarType;
using WebApi8_CarsApp.DTO.Maker;
using WebApi8_CarsApp.Models;

namespace WebApi8_CarsApp.Services.CarType
{
    public interface ICarTypeInterface
    {
        Task<ResponseModel<List<CarTypeModel>>> GetAll();
        Task<ResponseModel<CarTypeModel>> Register(CarTypeRegisterDTO carTypeRegister);
        Task<ResponseModel<CarTypeModel>> Edit(CarTypeEditDTO carTypeEdit);
        Task<ResponseModel<CarTypeModel>> Delete(int id);
    }
}
