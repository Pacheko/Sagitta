using CalendarioCovid.Negocios.Database;
using CalendarioCovid.Negocios.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sagitta.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CidadeController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable>> Get()
        {
            using var db = new AppDbContext();

            //db.Cidades.Add(new Cidade()
            //{
            //    NmCidade = "Venâncio Aires",
            //    NmUf = "Rio Grande do Sul",
            //    SiglaUf = "RS"
            //});
            //db.Cidades.Add(new Cidade()
            //{
            //    NmCidade = "Santa Cruz do Sul",
            //    NmUf = "Rio Grande do Sul",
            //    SiglaUf = "RS"
            //});
            //db.Cidades.Add(new Cidade()
            //{
            //    NmCidade = "Porto Alegre",
            //    NmUf = "Rio Grande do Sul",
            //    SiglaUf = "RS"
            //});
            //db.Cidades.Add(new Cidade()
            //{
            //    NmCidade = "Montenegro",
            //    NmUf = "Rio Grande do Sul",
            //    SiglaUf = "RS"
            //});
            //db.SaveChanges();


            return await db.Cidades.ToListAsync();
        }
    }
}
