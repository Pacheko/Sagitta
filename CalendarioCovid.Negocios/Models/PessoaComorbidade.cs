using System;
using System.Collections.Generic;
using System.Text;

namespace CalendarioCovid.Negocios.Models
{
  public  class PessoaComorbidade
    {
        public int Id { get; set; }
        public int PessoaId { get; set; }
        public int ComorbidadeId { get; set; }

        public Pessoa Pessoa { get; set; }
        public Comorbidade Comorbidade { get; set; }
    }
}
