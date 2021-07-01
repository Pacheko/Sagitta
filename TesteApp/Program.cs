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
           // AdicionaEventosVacinacao();
           // AdicionaPessoas();

            using var db = new AppDbContext();

            //Console.WriteLine("Calendário de Vacinação:\n");

            //foreach (var item in db.CalendarioVacinacao.OrderBy(x => x.DataInicial).ToList())
            //{
            //    Console.WriteLine(item.GetInfo());
            //}

            Console.WriteLine("\nPessoas Cadastradas, verificação:");

            var consulta = db.Pessoas
                .Where(x => x.Id > 0)
                .ToList();

            foreach (var item in consulta)
            {
                item.PodeVacinar(out string retorno);
                Console.WriteLine($"{item.GetInfo()} {retorno}");
            }








           







            //    Console.WriteLine("\nVerificação por CPF:");

            //    CalendarioCovid.Negocios.Models.Pessoa.PodeVacinar("1234", out string retorno1);
            //    Console.WriteLine(retorno1);

            //    CalendarioCovid.Negocios.Models.Pessoa.PodeVacinar("789", out string retorno2);
            //    Console.WriteLine(retorno2);

            //    Console.WriteLine("\nLista de Pessoas que podem tomar a vacina:");

            //    foreach (var item in database.Pessoas.ToList().FindAll(x => x.PodeVacinar() == true))
            //    {
            //        item.PodeVacinar(out string retorno);
            //        Console.WriteLine($"{item.GetInfo()} {retorno}");
            //    }

            //    Console.WriteLine("\nLista de Pessoas que ainda não podem tomar a vacina:");

            //    foreach (var item in database.Pessoas.ToList().FindAll(x => x.PodeVacinar() == false))
            //    {
            //        item.PodeVacinar(out string retorno);
            //        Console.WriteLine($"{item.GetInfo()} {retorno}");
            //    }
            //}

            Console.ReadKey();
        }

        public static void AdicionaEventosVacinacao()
        {
            using var db = new AppDbContext();

            var list = new List<CalendarioCovid.Negocios.Models.Calendario>()
            {
                new CalendarioCovid.Negocios.Models.Calendario()
                {
                    DataInicial = new DateTime(2021, 03, 01),
                    Evento="Vacinação Comorbidades 65+",
                    IdadeMinima =65,
                    ExigenciaComorbidade=true
                },

                new CalendarioCovid.Negocios.Models.Calendario()
                {
                    DataInicial = new DateTime(2021, 04, 01),
                    Evento="Vacinação Comorbidades 60+",
                    IdadeMinima =60,
                    ExigenciaComorbidade=true
                },

                new CalendarioCovid.Negocios.Models.Calendario()
                {
                    DataInicial = new DateTime(2021, 05, 01),
                    Evento="Vacinação Comorbidades 45+",
                    IdadeMinima =45,
                    ExigenciaComorbidade=true
                },

                new CalendarioCovid.Negocios.Models.Calendario()
                {
                    DataInicial = new DateTime(2021, 05, 10),
                    Evento="Vacinação Todas Pessoas 50+",
                    IdadeMinima =50,
                    ExigenciaComorbidade=false
                },

                new CalendarioCovid.Negocios.Models.Calendario()
                {
                    DataInicial = new DateTime(2021, 06, 05),
                    Evento="Vacinação Todas Pessoas 40+",
                    IdadeMinima =40,
                    ExigenciaComorbidade=false
                },

                new CalendarioCovid.Negocios.Models.Calendario()
                {
                    DataInicial = new DateTime(2021, 06, 10),
                    Evento="Vacinação Todas Pessoas 30+",
                    IdadeMinima =30,
                    ExigenciaComorbidade=false
                }
            };

            db.CalendarioVacinacao.AddRange(list);

            db.SaveChanges();
        }

        public static void AdicionaPessoas()
        {

            CalendarioCovid.Negocios.Managers.PessoaManager.Adiciona("Joao", "2134", 33, "M", "123", "telegram",
                        "email", "12/03/1988", "venus", "RS", true, "asma", "joao.silva", "123");

            CalendarioCovid.Negocios.Managers.PessoaManager.Adiciona("Adão", "789", 70, "M", "123", "telegram",
                        "email", "12/03/1950", "venus", "RS", true, "asma", "adao.silva", "dfsg");

        }
    }
}
