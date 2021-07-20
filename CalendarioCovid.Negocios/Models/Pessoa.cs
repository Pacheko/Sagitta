using CalendarioCovid.Negocios.Database;
using System;
using System.Linq;

namespace CalendarioCovid.Negocios.Models
{
    public class Pessoa
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string CPF { get; set; }
        public int Idade { get; set; }
        public string Sexo { get; set; }
        public string Fone { get; set; }
        public string Email { get; set; }
        public string DataNascimento { get; set; }
        public int CidadeId { get; set; }
        public Cidade Cidade { get; set; }
        public int? PrioridadeId { get; set; }
        public Prioridade Prioridade { get; set; }
        public bool SolicitaEmail { get; set; }
        public bool IsNotificado { get; set; }

        public bool PodeVacinar()
        {
            using (var database = new AppDbContext())
            {
                var calendario = database.CalendarioVacinacao.FirstOrDefault(x =>
                x.IdadeMinima <= Idade &&
                x.DataInicial.Date <= DateTime.Now.Date &&
                x.CidadeId == CidadeId &&
                x.PrioridadeId == PrioridadeId

                );

                if (calendario != null)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
    }
}
