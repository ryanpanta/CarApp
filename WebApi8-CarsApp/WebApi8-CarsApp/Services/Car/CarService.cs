using Microsoft.EntityFrameworkCore;
using WebApi8_CarsApp.Data;
using WebApi8_CarsApp.DTO.Car;
using WebApi8_CarsApp.Models;

namespace WebApi8_CarsApp.Services.Car
{
    public class CarService : ICarInterface
    {
        private readonly AppDbContext _context;
        public CarService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ResponseModel<CarModel>> Delete(Guid id)
        {
            ResponseModel<CarModel> response = new ResponseModel<CarModel>();
            try
            {
                var car = await _context.Carros
                    .FirstOrDefaultAsync(c => c.Id == id);

                if(car is null)
                {
                    response.Mensagem = "Nenhum registro localizado.";
                    return response;
                }
               
                _context.Remove(car);
                await _context.SaveChangesAsync();
                
                response.Dados = car;
                response.Mensagem = "Carro removido com sucesso!";
                return response;

            }
            catch (Exception ex)
            {
                response.Mensagem = ex.Message;
                response.Status = false;
                return response;
            }
        }

        public async Task<ResponseModel<CarModel>> Edit(CarEditDTO newCar)
        {
            ResponseModel<CarModel> response = new ResponseModel<CarModel>();

                var fabricante = await _context.Fabricantes.FindAsync(newCar.FabricanteId);
                var tipoVeiculo = await _context.Tipos.FindAsync(newCar.TipoVeiculoId);
            try
            {
                var car = await _context.Carros
                    .FirstOrDefaultAsync(c => c.Id == newCar.Id);

                if (car is null)
                {
                    response.Mensagem = "Nenhum registro localizado.";
                    return response;
                }

                car.Modelo = newCar.Modelo;
                car.TipoVeiculo = tipoVeiculo;
                car.Fabricante = fabricante;
                car.Ano = newCar.Ano;

                _context.Update(car);
                await _context.SaveChangesAsync();

                response.Dados = car;
                response.Mensagem = "Carro atualizado com sucesso!";
                return response;

            }
            catch (Exception ex)
            {
                response.Mensagem = ex.Message;
                response.Status = false;
                return response;
            }
        }

        public async Task<ResponseModel<List<CarModel>>> GetAll(int page = 0, int pageSize = 10)
        {
            ResponseModel<List<CarModel>> response = new ResponseModel<List<CarModel>>(); 
            try
            {
                var query = _context.Carros
                    .Include(c => c.Fabricante)
                    .Include(c => c.TipoVeiculo)
                    .Include(c => c.Usuario);

                
                var totalItems = await query.CountAsync();

                var cars = await query
                    .Skip(page * pageSize)
                    .Take(pageSize)
                    .ToListAsync();
                

                response.Dados = cars;
                response.TotalItems = totalItems;
                response.Mensagem = "Todos os carros foram listados com sucesso!";
                return response;

            }
            catch (Exception ex)
            {
                response.Mensagem = ex.Message;
                response.Status = false;
                return response;
            }
        }

        public async Task<ResponseModel<CarModel>> GetById(Guid id)
        {
            ResponseModel<CarModel> response = new ResponseModel<CarModel>();
            try
            {
                var car = await _context.Carros
                    .Include(c => c.Fabricante)
                    .Include(c => c.TipoVeiculo)
                    .Include(c => c.Usuario)
                    .FirstOrDefaultAsync(c => c.Id == id);

                if(car is null)
                {
                    response.Mensagem = "Nenhum registro localizado.";
                    return response;
                }

                response.Dados = car;
                response.Mensagem = "Carro localizado!";
                return response;

            }
            catch (Exception ex) 
            {
                response.Mensagem = ex.Message;
                response.Status = false;
                return response;
            }
        }

        public async Task<ResponseModel<CarModel>> Register(CarRegisterDTO carRegisterDTO)
        {
            ResponseModel<CarModel> response = new ResponseModel<CarModel>();
            try
            {
                var fabricante = await _context.Fabricantes.FindAsync(carRegisterDTO.FabricanteId);
                var tipoVeiculo = await _context.Tipos.FindAsync(carRegisterDTO.TipoVeiculoId);

                if (fabricante == null || tipoVeiculo == null)
                {
                    response.Mensagem = "Fabricante ou tipo de veículo inválido.";
                    response.Status = false;
                    return response;
                }

                var car = new CarModel()
                {
                    Modelo = carRegisterDTO.Modelo,
                    Fabricante = fabricante,
                    TipoVeiculo = tipoVeiculo,
                    Ano = carRegisterDTO.Ano,
                   
                };

                _context.Add(car);
                await _context.SaveChangesAsync();

                response.Dados = car;
                response.Mensagem = "Carro cadastrado com sucesso!";


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
