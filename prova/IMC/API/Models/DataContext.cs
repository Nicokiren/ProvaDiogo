using Microsoft.EntityFrameworkCore;

public class ImcContext : DbContext
{
    public DbSet<Aluno> Alunos { get; set; }
    public DbSet<Imc> Imcs { get; set; }

    public ImcContext(DbContextOptions<ImcContext> options) : base(options) { }
}