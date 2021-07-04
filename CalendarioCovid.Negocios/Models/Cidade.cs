using System;
using System.Collections.Generic;
using System.Text;

namespace CalendarioCovid.Negocios.Models
{
    public class Cidade
    {
        public int Id { get; set; }
        public string NmCidade { get; set; }
        public string SiglaUf { get; set; }
        public string NmUf { get; set; }
    }
}
