using CalendarioCovid.Negocios.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CalendarioCovid.Negocios.Models;

namespace Sagitta.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TiposVacinaController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable>> GetTodasVacinas()
        {
            using var db = new AppDbContext();

            //TipoVacina t = new TipoVacina()
            //{
            //    NmVacina = "aztrazeneca",
            //    QtDoses = 2
            //};

            //TipoVacina t2 = new TipoVacina()
            //{
            //    NmVacina = "Coronavac",
            //    QtDoses = 1
            //};

            //db.TipoVacinas.Add(t);
            //db.TipoVacinas.Add(t2);

            //db.SaveChanges();

            return await db.TipoVacinas.ToArrayAsync();
        }
    }
}
