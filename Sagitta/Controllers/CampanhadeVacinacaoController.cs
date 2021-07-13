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
    public class retornoCampanha
    {
        public int Id { get; set; }
        public string DataInicial { get; set; }
        public int IdadeMinima { get; set; }
        public string PrioridadeId { get; set; }     
        public string CidadeId { get; set; }    
        public string TipoVacinaId { get; set; }
       
    }

    [ApiController]
    [Route("api/[controller]")]
    public class CampanhadeVacinacaoController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable>> GetCampanha()
        {

            using var db = new AppDbContext();

            var query =
               from Calendario in db.CalendarioVacinacao
               from cidade in db.Cidades
               .Where(x => x.Id == Calendario.CidadeId)
               from TipoVacina in db.TipoVacinas
               .Where(x => x.Id == Calendario.TipoVacinaId)
               from prioridade in db.Prioridades
               .Where(prioridade => (prioridade.Id == Calendario.PrioridadeId || prioridade == null)).DefaultIfEmpty()
               select new retornoCampanha()
               {
                   Id = Calendario.Id,
                   DataInicial = Calendario.DataInicial.ToString("dd/MM/yyyy"),
                   IdadeMinima = Calendario.IdadeMinima,
                   PrioridadeId = prioridade.NmGrupo,
                   CidadeId = cidade.NmCidade,
                   TipoVacinaId = TipoVacina.NmVacina
                   
               };

            return await query.ToListAsync();       
        }

        [HttpPost]
        public async Task<ActionResult<Calendario>> PostNovoCadastro([FromForm] Calendario calendario)
        {
            using var db = new AppDbContext();

            db.CalendarioVacinacao.Add(calendario);

            await db.SaveChangesAsync();


            return CreatedAtAction("GetCampanha", new { id = calendario.Id }, calendario);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable>> CarregarCampanhaAsync(int id)
        {

            using var db = new AppDbContext();

            var calendario = await db.CalendarioVacinacao.FindAsync(id);

            if (calendario == null)
            {
                return NotFound();
            }

            return db.CalendarioVacinacao.Where(x => x.Id == id).ToList();


        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditarCampanha(int id, [FromForm] Calendario calendario)
        {
            if (id != calendario.Id)
            {
                return BadRequest();
            }

            using var db = new AppDbContext();

            db.Entry(calendario).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CalendarioExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCampanha(int id)
        {
            using var db = new AppDbContext();

            var calendario = await db.CalendarioVacinacao.FindAsync(id);
            if (calendario == null)
            {
                return NotFound();
            }

            db.CalendarioVacinacao.Remove(calendario);
            await db.SaveChangesAsync();

            return NoContent();
        }

        private bool CalendarioExists(int id)
        {
            using var db = new AppDbContext();

            return db.CalendarioVacinacao.Any(e => e.Id == id);
        }
    }
}
