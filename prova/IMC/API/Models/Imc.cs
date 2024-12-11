using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

public class Imc
{
    public int Id { get; set; }
    public int AlunoId { get; set; }

    public Aluno Aluno { get; set; } = null!;
    public double Altura { get; set; }
    public double Peso { get; set; }
    public double ValorIMC { get; set; }
    public string Classificacao { get; set; } = string.Empty;
    public DateTime DataCriacao { get; set; }
}