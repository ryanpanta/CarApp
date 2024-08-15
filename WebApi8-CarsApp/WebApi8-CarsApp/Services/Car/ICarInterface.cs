using WebApi8_CarsApp.DTO.Car;
using WebApi8_CarsApp.Models;

namespace WebApi8_CarsApp.Services.Car
{
    public interface ICarInterface
    {
        Task<ResponseModel<List<CarModel>>> GetAll(int page, int pageSize);
        Task<ResponseModel<CarModel>> GetById(Guid id);
        Task<ResponseModel<CarModel>> Register(CarRegisterDTO carRegisterDTO);
        Task<ResponseModel<CarModel>> Edit(CarEditDTO newCar);
        Task<ResponseModel<CarModel>> Delete(Guid id);
    }
}
