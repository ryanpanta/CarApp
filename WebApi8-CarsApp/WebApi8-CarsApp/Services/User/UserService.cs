using Azure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using WebApi8_CarsApp.Data;
using WebApi8_CarsApp.DTO.User;
using WebApi8_CarsApp.Models;

namespace WebApi8_CarsApp.Services.User
{
    public class UserService : IUserInterface
    {
        private readonly AppDbContext _context;
        public UserService(AppDbContext context) {
            _context = context;
        }

        public Task<ResponseModel<UserModel>> Delete(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<ResponseModel<List<UserModel>>> GetAll()
        {
            ResponseModel<List<UserModel>> response = new ResponseModel<List<UserModel>>();
            try
            {
                var cars = await _context.Usuarios.ToListAsync();

                response.Dados = cars;
                response.Mensagem = "Todos os usuários foram listados com sucesso!";
                return response;

            }
            catch (Exception ex)
            {
                response.Mensagem = ex.Message;
                response.Status = false;
                return response;
            }
        }

        public Task<ResponseModel<UserModel>> GetById(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<ResponseModel<UserModel>> Register(UserRegisterDTO userRegister)
        {
            ResponseModel<UserModel> response = new ResponseModel<UserModel>();
            try
            {
                var car = new UserModel()
                {
                    Nome = userRegister.Nome,
                    Email = userRegister.Email,
                    Senha = userRegister.Senha,
                };

                _context.Add(car);
                await _context.SaveChangesAsync();

                response.Dados = car;
                response.Mensagem = "Usuário cadastrado com sucesso!";
                return response;

            }
            catch (Exception ex)
            {
                response.Mensagem = ex.Message;
                response.Status = false;
                return response;
            }
        }
    }
}
