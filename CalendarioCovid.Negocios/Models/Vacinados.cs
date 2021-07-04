using System;
using System.Collections.Generic;
using System.Text;

namespace CalendarioCovid.Negocios.Models
{
    public class Vacinados
    {
        public int Id { get; set; }
        public int PessoaId { get; set; }
        public Pessoa Pessoa { get; set; }
        public DateTime DataVacinacao { get; set; }
        public int TipoVacinaId { get; set; }
        public TipoVacina TipoVacina { get; set; }
        public int Dose { get; set; }
    }
}
