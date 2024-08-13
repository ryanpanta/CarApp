using Microsoft.EntityFrameworkCore;
using WebApi8_CarsApp.Data;
using WebApi8_CarsApp.DTO.Maker;
using WebApi8_CarsApp.Models;

namespace WebApi8_CarsApp.Services.Maker
{
    public class MakerService : IMakerInterface
    {
        private readonly AppDbContext _context;
        public MakerService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<ResponseModel<MakerModel>> Delete(int id)
        {
            ResponseModel<MakerModel> response = new ResponseModel<MakerModel>();
            try
            {
                var maker = await _context.Fabricantes.FirstOrDefaultAsync(m => m.Id == id);

                if (maker is null)
                {
                    response.Mensagem = "Fabricante não encontrado.";
                    return response;
                }

                _context.Remove(maker);
                await _context.SaveChangesAsync();

                response.Dados = maker;
                response.Mensagem = "Fabricante deletado com sucesso!";
                return response;

            }
            catch (Exception ex)
            {
                response.Mensagem = ex.Message;
                response.Status = false;
                return response;
            }
        }

        public async Task<ResponseModel<MakerModel>> Edit(MakerEditDTO makerEdit)
        {
            ResponseModel<MakerModel> response = new ResponseModel<MakerModel>();

            try
            {
                var maker = await _context.Fabricantes
                    .FirstOrDefaultAsync(m => m.Id == makerEdit.Id);

                if (maker is null)
                {
                    response.Mensagem = "Nenhum registro localizado.";
                    return response;
                }

                maker.Nome = makerEdit.Nome;

                _context.Update(maker);
                await _context.SaveChangesAsync();

                response.Dados = maker;
                response.Mensagem = "Fabricante atualizado com sucesso!";
                return response;

            }
            catch (Exception ex)
            {
                response.Mensagem = ex.Message;
                response.Status = false;
                return response;
            }
        }

        public async Task<ResponseModel<List<MakerModel>>> GetAll()
        {
            ResponseModel<List<MakerModel>> response = new ResponseModel<List<MakerModel>>();
            try
            {
                var makers = await _context.Fabricantes.ToListAsync();

                response.Dados = makers;
                response.Mensagem = "Todos os fabricantes foram listados com sucesso!";
                return response;

            }
            catch (Exception ex)
            {
                response.Mensagem = ex.Message;
                response.Status = false;
                return response;
            }
        }

        public async Task<ResponseModel<MakerModel>> Register(MakerRegisterDTO makerRegister)
        {
            ResponseModel<MakerModel> response = new ResponseModel<MakerModel>();
            try
            {
                var maker = new MakerModel()
                {
                    Nome = makerRegister.Nome,
                };

                _context.Add(maker);
                await _context.SaveChangesAsync();

                response.Dados = maker;
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
