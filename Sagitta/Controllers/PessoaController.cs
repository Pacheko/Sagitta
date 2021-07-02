using CalendarioCovid.Negocios.Database;
using CalendarioCovid.Negocios.Models;
using Microsoft.AspNetCore.Http;
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
        private readonly AppDbContext _context;

        [HttpGet]
        public IEnumerable<Pessoa> GetTodasPessoas()
        {
            using var db = new AppDbContext();

            return db.Pessoas.Where(x => x.Id > 0)
                 .ToList();
        }

        [HttpGet("{vacinadas}")]
        public IEnumerable<Pessoa> GetPessoasVacinadas(string vacinadas)
        {
            using var db = new AppDbContext();

            return db.Pessoas.Where(x => x.Id == 1).ToList();
        }


        [HttpPost("{nome}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        //public async Task<IActionResult> SalvarPessoa([FromBody] string nome, string idade)
        public void SalvarPessoa([FromBody] string nome)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}
            ////_context.Pessoas.Add(pessoa);
            //await _context.SaveChangesAsync();
            //  return CreatedAtAction("salvarpessoa");
        }
    }
}
