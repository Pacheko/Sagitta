using System;
using System.Collections.Generic;
using System.Text;

namespace CalendarioCovid.Negocios.Models
{
    public class Calendario
    {
        public int Id { get; set; }
        public DateTime DataInicial { get; set; }
        public string Evento { get; set; }
        public int IdadeMinima { get; set; }
        public bool ExigenciaComorbidade { get; set; }

        public Calendario() { }

        public Calendario(DateTime dataInicial, string evento, int idadeMinima, bool exigenciaComorbidade)
        {
            DataInicial = dataInicial;
            Evento = evento;
            IdadeMinima = idadeMinima;
            ExigenciaComorbidade = exigenciaComorbidade;
        }

        public string GetInfo()
        {
            string aux = ExigenciaComorbidade ? "Com Comorbidades" : "Sem Comorbidades";

            return $"{Id} - {DataInicial.ToShortDateString()} - {Evento} - {IdadeMinima} - {aux}";
        }
    }
}
