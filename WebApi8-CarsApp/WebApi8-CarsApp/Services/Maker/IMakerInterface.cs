using WebApi8_CarsApp.DTO.Maker;
using WebApi8_CarsApp.DTO.User;
using WebApi8_CarsApp.Models;

namespace WebApi8_CarsApp.Services.Maker
{
    public interface IMakerInterface
    {
        Task<ResponseModel<List<MakerModel>>> GetAll();
        Task<ResponseModel<MakerModel>> Register(MakerRegisterDTO makerRegister);
        Task<ResponseModel<MakerModel>> Edit(MakerEditDTO makerEdit);
        Task<ResponseModel<MakerModel>> Delete(int id);
    }
}
