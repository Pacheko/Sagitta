using CalendarioCovid.Negocios.Database;
using Microsoft.AspNetCore.Mvc;
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
    public class PessoasAptasController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable>> Get()
        {
            using var db = new AppDbContext();

            List<Pessoa> pessoasNaoAptas = new List<Pessoa>();

            foreach (var item in db.Pessoas)
            {
                if (item.PodeVacinar())
                {
                    pessoasNaoAptas.Add(item);
                }
            }

            var query =
               from pessoa in pessoasNaoAptas
               from cidade in db.Cidades
               .Where(x => x.Id == pessoa.CidadeId)
               select new retorno()
               {
                   Nome = pessoa.Nome,
                   Idade = pessoa.Idade,
                   Email = pessoa.Email,
                   Cidade = cidade.NmCidade,
                   Estado = cidade.SiglaUf
               };
            try
            {
                return query.ToArray();
            }
            catch (Exception ex)
            {
                return NotFound();
            }
        }
    }
}
