using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using WebApi8_CarsApp.Data;
using WebApi8_CarsApp.Services.Car;
using WebApi8_CarsApp.Services.CarType;
using WebApi8_CarsApp.Services.Maker;
using WebApi8_CarsApp.Services.User;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//builder.Services.AddControllers().AddJsonOptions(options =>
//{
//    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
//});

builder.Services.AddScoped<ICarInterface, CarService>();
builder.Services.AddScoped<IUserInterface, UserService>();
builder.Services.AddScoped<IMakerInterface, MakerService>();
builder.Services.AddScoped<ICarTypeInterface, CarTypeService>();

builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
