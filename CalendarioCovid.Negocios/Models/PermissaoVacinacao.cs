using System;
using System.Collections.Generic;
using System.Text;

namespace CalendarioCovid.Negocios.Models
{
    public class PermissaoVacinacao
    {
        public int Id { get; set; }
        public int PessoaId { get; set; }
        public int CalendarioId { get; set; }

        public Pessoa Pessoa { get; set; }
        public Calendario Calendario { get; set; }
    }
}
