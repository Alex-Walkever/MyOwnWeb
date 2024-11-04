using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MyOwnWeb;
using MyOwnWeb.Tools;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton(provider => new MapperConfiguration(configuration => 
{
    configuration.AddProfile(new AutoMapperProfiles());
}).CreateMapper());

var originalsPermitted = builder.Configuration.GetValue<string>("originalsPermitted")!.Split(",");

builder.Services.AddDbContext<AppDBContext>(options => options.UseSqlServer("name=DefaultConnection",
    sqlServer => sqlServer.UseNetTopologySuite()));

builder.Services.AddOutputCache(options =>
{
    options.DefaultExpirationTimeSpan = TimeSpan.FromSeconds(60);
});

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(optionsCORS =>
    {
        optionsCORS.WithOrigins(originalsPermitted).AllowAnyMethod().AllowAnyHeader()
        .WithExposedHeaders(UtilityVariables.TotalQuantityRecords);
    });
});

builder.Services.AddHttpContextAccessor();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();


app.UseHttpsRedirection();

app.UseCors();

app.UseOutputCache();

app.UseAuthorization();

app.MapControllers();

app.Run();
