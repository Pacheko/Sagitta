using CalendarioCovid.Negocios.Database;
using CalendarioCovid.Negocios.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sagitta.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PessoaController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<Pessoa> Get()
        {
            using var db = new AppDbContext();

            return db.Pessoas.Where(x => x.Id > 0)
                 .ToList();


            //var consulta = db.Pessoas
            //    .Where(x => x.Id > 0)
            //    .ToList();

            //foreach (var item in consulta)
            //{
            //    item.PodeVacinar(out string retorno);
            //    Console.WriteLine($"{item.GetInfo()} {retorno}");
            //}

            //return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            //{
            //    Date = DateTime.Now.AddDays(index),
            //    TemperatureC = rng.Next(-20, 55),
            //    Summary = Summaries[rng.Next(Summaries.Length)]
            //})
            //.ToArray();
        }
    }
}
