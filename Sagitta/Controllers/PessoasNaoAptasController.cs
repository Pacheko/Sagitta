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
    [Route("api/[controller]")]
    public class PessoasNaoAptasController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable>> Get()
        {
            using var db = new AppDbContext();

            var registropessoa = from pessoa in db.Pessoas
                                 join prioridade in db.Prioridades on pessoa.PrioridadeId equals prioridade.Id
                                 join calendario in db.CalendarioVacinacao on prioridade.Id equals calendario.PrioridadeId
                                 join cidade in db.Cidades on calendario.CidadeId equals cidade.Id
                                 where pessoa.Idade < calendario.IdadeMinima

                                 select new
                                 {
                                     pessoa.Id,
                                     pessoa.Nome,
                                     pessoa.Idade,
                                     pessoa.Email,
                                     Cidade = cidade.NmCidade,
                                     Estado = cidade.SiglaUf
                                 };

            return await registropessoa.Distinct().ToListAsync();
        }
    }
}
