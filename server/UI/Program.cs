using Business.Services.Abstract;
using Business.Services.Concrete;
using BusinessLayer.Concrete;
using DataLayer;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", builder =>
    {
        builder.WithOrigins("http://localhost:3000") 
               .AllowAnyMethod()
               .AllowAnyHeader()
               .AllowCredentials();
    });
});


builder.Services.AddDbContext<CanvasDemoContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("CanvasDemoDb")));

builder.Services.AddScoped<IUserService, UserManager>();
builder.Services.AddScoped<ICanvasService, CanvasManager>();
builder.Services.AddScoped<IElementService, ElementManager>();
builder.Services.AddScoped(typeof(BaseManager<>));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("AllowSpecificOrigin");

app.UseAuthorization(); 

app.MapControllers(); 

app.Run();