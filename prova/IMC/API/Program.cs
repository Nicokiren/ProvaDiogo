using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ImcContext>(options =>
    options.UseSqlite("Data Source=IMCProject.db"));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "IMC API", Version = "v1" });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "IMC API v1"));
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");

app.MapPost("api/aluno/cadastrar", async (ImcContext context, Aluno aluno) =>
{
    if (await context.Alunos.AnyAsync(a => a.Nome == aluno.Nome && a.Sobrenome == aluno.Sobrenome))
    {
        return Results.BadRequest("Aluno já cadastrado.");
    }

    context.Alunos.Add(aluno);
    await context.SaveChangesAsync();

    return Results.Ok(aluno);
});

app.MapPost("api/imc/cadastrar", async (ImcContext context, ImcDto imcDto) =>
{
    var aluno = await context.Alunos.FindAsync(imcDto.AlunoId);
    if (aluno == null)
    {
        return Results.NotFound("Aluno não encontrado.");
    }

    double imcValue = imcDto.Peso / (imcDto.Altura * imcDto.Altura);
    string classificacao = GetClassificacao(imcValue);

    var imc = new Imc
    {
        AlunoId = imcDto.AlunoId,
        Altura = imcDto.Altura,
        Peso = imcDto.Peso,
        ValorIMC = imcValue,
        Classificacao = classificacao,
        DataCriacao = DateTime.Now
    };

    context.Imcs.Add(imc);
    await context.SaveChangesAsync();

    return Results.Ok(imc);
});

app.MapGet("api/aluno/listar", async (ImcContext context) =>
{
    var alunos = await context.Alunos.ToListAsync();
    return Results.Ok(alunos);
});

app.MapGet("api/imc/listar", async (ImcContext context) =>
{
    var imcs = await context.Imcs.Include(i => i.Aluno).ToListAsync();
    return Results.Ok(imcs);
});

app.MapGet("api/imc/listarporaluno/{alunoId}", async (ImcContext context, int alunoId) =>
{
    var imcs = await context.Imcs.Include(i => i.Aluno).Where(i => i.AlunoId == alunoId).ToListAsync();
    return Results.Ok(imcs);
});

app.MapPut("api/imc/alterar/{id}", async (ImcContext context, int id, ImcDto imcDto) =>
{
    var imc = await context.Imcs.FindAsync(id);
    if (imc == null)
    {
        return Results.NotFound("IMC não encontrado.");
    }

    imc.Altura = imcDto.Altura;
    imc.Peso = imcDto.Peso;
    imc.ValorIMC = imcDto.Peso / (imcDto.Altura * imcDto.Altura);
    imc.Classificacao = GetClassificacao(imc.ValorIMC);

    await context.SaveChangesAsync();

    return Results.Ok(imc);
});

app.Run();

static string GetClassificacao(double imc)
{
    if (imc < 18.5) return "Abaixo do peso";
    if (imc < 24.9) return "Peso normal";
    if (imc < 29.9) return "Sobrepeso";
    return "Obesidade";
}