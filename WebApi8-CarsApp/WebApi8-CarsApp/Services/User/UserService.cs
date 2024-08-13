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

        public async Task<ResponseModel<UserModel>> Delete(Guid id)
        {
            ResponseModel<UserModel> response = new ResponseModel<UserModel>();
            try
            {
                var user = await _context.Usuarios.FirstOrDefaultAsync(u => u.Id == id);

                if (user is null)
                {
                    response.Mensagem = "Usuário não encontrado.";
                    return response;
                }

                _context.Remove(user);
                await _context.SaveChangesAsync();

                response.Dados = user;
                response.Mensagem = "Usuário encontrado com sucesso!";
                return response;

            }
            catch (Exception ex)
            {
                response.Mensagem = ex.Message;
                response.Status = false;
                return response;
            }
        }

        public async Task<ResponseModel<List<UserModel>>> GetAll()
        {
            ResponseModel<List<UserModel>> response = new ResponseModel<List<UserModel>>();
            try
            {
                var users = await _context.Usuarios.ToListAsync();

                response.Dados = users;
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

        public async Task<ResponseModel<UserModel>> GetById(Guid id)
        {
            ResponseModel<UserModel> response = new ResponseModel<UserModel>();
            try
            {
                var user = await _context.Usuarios.FirstOrDefaultAsync(u => u.Id == id);

                if(user is null)
                {
                    response.Mensagem = "Usuário não encontrado.";
                    return response;
                }

                response.Dados = user;
                response.Mensagem = "Usuário encontrado com sucesso!";
                return response;

            }
            catch (Exception ex)
            {
                response.Mensagem = ex.Message;
                response.Status = false;
                return response;
            }
        }

        public async Task<ResponseModel<UserModel>> Register(UserRegisterDTO userRegister)
        {
            ResponseModel<UserModel> response = new ResponseModel<UserModel>();
            try
            {
                var user = new UserModel()
                {
                    Nome = userRegister.Nome,
                    Email = userRegister.Email,
                    Senha = userRegister.Senha,
                };

                _context.Add(user);
                await _context.SaveChangesAsync();

                response.Dados = user;
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

        public async Task<ResponseModel<UserModel>> Login(string email, string password, HttpContext httpContext)
        {
            ResponseModel<UserModel> response = new ResponseModel<UserModel>();

            try
            {
                var user = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == email && u.Senha == password); 

                if (user is null)
                {
                    response.Mensagem = "Usuário não cadastrado!";
                    return response;
                }

                httpContext.Session.SetString("UserId", user.Id.ToString());
                httpContext.Session.SetString("UserName", user.Nome);

                response.Dados = user;
                response.Mensagem = "Login realizado com sucesso!";
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
