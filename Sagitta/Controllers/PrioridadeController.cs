using CalendarioCovid.Negocios.Database;
using CalendarioCovid.Negocios.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sagitta.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PrioridadeController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable>> GetPrioridade()
        {
            using var db = new AppDbContext();
            return await db.Prioridades.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Prioridade>> PostNovaPrioridade([FromForm] Prioridade prioridade)
        {
            using var db = new AppDbContext();
            db.Prioridades.Add(prioridade);

            await db.SaveChangesAsync();
            return CreatedAtAction("GetPrioridade", new { id = prioridade.Id }, prioridade);
        }

        [HttpGet("{id}")]
        public async Task<IEnumerable<Prioridade>> CarregarPrioridadeAsync(int id)
        {
            using var db = new AppDbContext();
            var prioridade = await db.Prioridades.FindAsync(id);

            if (prioridade == null)
            {
                return (IEnumerable<Prioridade>)NotFound();
            }

            return db.Prioridades.Where(x => x.Id == id).ToList();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditarPrioridade(int id, [FromForm] Prioridade prioridade)
        {
            if (id != prioridade.Id)
            {
                return BadRequest();
            }

            using var db = new AppDbContext();

            db.Entry(prioridade).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PrioridadeExists(id))
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
        public async Task<IActionResult> DeletePrioridade(int id)
        {
            using var db = new AppDbContext();

            var prioridade = await db.Prioridades.FindAsync(id);
            if (prioridade == null)
            {
                return NotFound();
            }

            db.Prioridades.Remove(prioridade);
            await db.SaveChangesAsync();

            return NoContent();
        }

        private bool PrioridadeExists(int id)
        {
            using var db = new AppDbContext();

            return db.Prioridades.Any(e => e.Id == id);
        }


    }
}
