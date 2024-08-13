using WebApi8_CarsApp.DTO.User;
using WebApi8_CarsApp.Models;

namespace WebApi8_CarsApp.Services.User
{
    public interface IUserInterface 
    {
        Task<ResponseModel<List<UserModel>>> GetAll();
        Task<ResponseModel<UserModel>> GetById(Guid id);
        Task<ResponseModel<UserModel>> Register(UserRegisterDTO userRegister);
        Task<ResponseModel<UserModel>> Delete(Guid id);
        Task<ResponseModel<UserModel>> Login(string email, string password, HttpContext httpContext);
        

    }
}
