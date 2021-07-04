using System;
using System.Collections.Generic;
using System.Text;

namespace CalendarioCovid.Negocios.Models
{
    public class Calendario
    {
        public int Id { get; set; }
        public DateTime DataInicial { get; set; }
        public int IdadeMinima { get; set; }
        public int PrioridadeId { get; set; }
        public Prioridade Prioridade { get; set; }
        public int CidadeId { get; set; }
        public Cidade Cidade { get; set; }
        public int TipoVacinaId { get; set; }
        public TipoVacina TipoVacina { get; set; }


        public Calendario() { }

        public string GetInfo()
        {
            //  string aux = ExigenciaComorbidade ? "Com Comorbidades" : "Sem Comorbidades";

            //  return $"{Id} - {DataInicial.ToShortDateString()} - {Evento} - {IdadeMinima} - {aux}";
            return string.Empty;
        }
    }
}
