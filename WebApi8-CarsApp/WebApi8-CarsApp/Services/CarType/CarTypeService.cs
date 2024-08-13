using Microsoft.EntityFrameworkCore;
using WebApi8_CarsApp.Data;
using WebApi8_CarsApp.DTO.CarType;
using WebApi8_CarsApp.Models;

namespace WebApi8_CarsApp.Services.CarType
{
    public class CarTypeService : ICarTypeInterface
    {
        public readonly AppDbContext _context;
        public CarTypeService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<ResponseModel<CarTypeModel>> Delete(int id)
        {
            ResponseModel<CarTypeModel> response = new ResponseModel<CarTypeModel>();
            try
            {
                var type = await _context.Tipos.FirstOrDefaultAsync(t => t.Id == id);

                if (type is null)
                {
                    response.Mensagem = "Tipo não encontrado.";
                    return response;
                }

                _context.Remove(type);
                await _context.SaveChangesAsync();

                response.Dados = type;
                response.Mensagem = "Tipo deletado com sucesso!";
                return response;

            }
            catch (Exception ex)
            {
                response.Mensagem = ex.Message;
                response.Status = false;
                return response;
            }
        }

        public async Task<ResponseModel<CarTypeModel>> Edit(CarTypeEditDTO carTypeEdit)
        {
            ResponseModel<CarTypeModel> response = new ResponseModel<CarTypeModel>();

            try
            {
                var type = await _context.Tipos
                    .FirstOrDefaultAsync(t => t.Id == carTypeEdit.Id);

                if (type is null)
                {
                    response.Mensagem = "Nenhum registro localizado.";
                    return response;
                }

                type.Nome = type.Nome;

                _context.Update(type);
                await _context.SaveChangesAsync();

                response.Dados = type;
                response.Mensagem = "Tipo atualizado com sucesso!";
                return response;

            }
            catch (Exception ex)
            {
                response.Mensagem = ex.Message;
                response.Status = false;
                return response;
            }
        }

        public async Task<ResponseModel<List<CarTypeModel>>> GetAll()
        {
            ResponseModel<List<CarTypeModel>> response = new ResponseModel<List<CarTypeModel>>();
            try
            {
                var types = await _context.Tipos.ToListAsync();

                response.Dados = types;
                response.Mensagem = "Todos os tipos foram listados com sucesso!";
                return response;

            }
            catch (Exception ex)
            {
                response.Mensagem = ex.Message;
                response.Status = false;
                return response;
            }
        }

        public async Task<ResponseModel<CarTypeModel>> Register(CarTypeRegisterDTO carTypeRegister)
        {
            ResponseModel<CarTypeModel> response = new ResponseModel<CarTypeModel>();
            try
            {
                var type = new CarTypeModel()
                {
                    Nome = carTypeRegister.Nome,
                };

                _context.Add(type);
                await _context.SaveChangesAsync();

                response.Dados = type;
                response.Mensagem = "Fabricante cadastrado com sucesso!";
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
