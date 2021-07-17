using CalendarioCovid.Negocios.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace TesteApp
{
    class Program
    {
        static void Main(string[] args)
        {
            CalendarioCovid.Negocios.Mensageria.EnviarEmail("fulano", "marco.a.pacheko@gmail.com", "campanhateste", "venancio aires");

           // AdicionaEventosVacinacao();
           // AdicionaPessoas();

            

            Console.ReadKey();
        }

        public static void AdicionaEventosVacinacao()
        {
            using var db = new AppDbContext();

            var list = new List<CalendarioCovid.Negocios.Models.Calendario>()
            {
                //new CalendarioCovid.Negocios.Models.Calendario()
                //{
                //    DataInicial = new DateTime(2021, 03, 01),
                //    Evento="Vacinação Comorbidades 65+",
                //    IdadeMinima =65,
                //    ExigenciaComorbidade=true
                //},

                //new CalendarioCovid.Negocios.Models.Calendario()
                //{
                //    DataInicial = new DateTime(2021, 04, 01),
                //    Evento="Vacinação Comorbidades 60+",
                //    IdadeMinima =60,
                //    ExigenciaComorbidade=true
                //},

                //new CalendarioCovid.Negocios.Models.Calendario()
                //{
                //    DataInicial = new DateTime(2021, 05, 01),
                //    Evento="Vacinação Comorbidades 45+",
                //    IdadeMinima =45,
                //    ExigenciaComorbidade=true
                //},

                //new CalendarioCovid.Negocios.Models.Calendario()
                //{
                //    DataInicial = new DateTime(2021, 05, 10),
                //    Evento="Vacinação Todas Pessoas 50+",
                //    IdadeMinima =50,
                //    ExigenciaComorbidade=false
                //},

                //new CalendarioCovid.Negocios.Models.Calendario()
                //{
                //    DataInicial = new DateTime(2021, 06, 05),
                //    Evento="Vacinação Todas Pessoas 40+",
                //    IdadeMinima =40,
                //    ExigenciaComorbidade=false
                //},

                //new CalendarioCovid.Negocios.Models.Calendario()
                //{
                //    DataInicial = new DateTime(2021, 06, 10),
                //    Evento="Vacinação Todas Pessoas 30+",
                //    IdadeMinima =30,
                //    ExigenciaComorbidade=false
                //}
            };

            db.CalendarioVacinacao.AddRange(list);

            db.SaveChanges();
        }

        public static void AdicionaPessoas()
        {

    

        }
    }
}
