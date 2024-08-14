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
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure CORS to allow requests from the frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", builder =>
    {
        builder.WithOrigins("http://localhost:5173") 
               .AllowAnyMethod()
               .AllowAnyHeader()
               .AllowCredentials(); 
    });
});

// Adiciona o serviço de sessão
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30); // Tempo de expiração da sessão
    options.Cookie.HttpOnly = false;
    options.Cookie.IsEssential = true;
    options.Cookie.SameSite = SameSiteMode.None; // Permite cookies entre sites
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // Apenas HTTPS
});

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

// Use CORS
app.UseCors("AllowSpecificOrigins");

// Adiciona o middleware de sessão
app.UseSession();

app.UseAuthorization();

app.MapControllers();

app.Run();
