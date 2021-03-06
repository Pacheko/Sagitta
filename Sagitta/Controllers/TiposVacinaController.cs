using CalendarioCovid.Negocios.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CalendarioCovid.Negocios.Models;

namespace Sagitta.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TiposVacinaController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable>> GetTodasVacinas()
        {
            using var db = new AppDbContext();
            return await db.TipoVacinas.ToArrayAsync();
        }

        [HttpPost]
        public async Task<ActionResult<TipoVacina>> PostNovoCadastro([FromForm] TipoVacina vacina)
        {
            using var db = new AppDbContext();
            db.TipoVacinas.Add(vacina);
            await db.SaveChangesAsync();

            return CreatedAtAction("GetTodasVacinas", new { id = vacina.Id }, vacina);
        }

        [HttpGet("{id}")]
        public async Task<IEnumerable<TipoVacina>> CarregarVacinaAsync(int id)
        {
            using var db = new AppDbContext();
            var vacina = await db.TipoVacinas.FindAsync(id);

            if (vacina == null)
            {
                return (IEnumerable<TipoVacina>)NotFound();
            }

            return db.TipoVacinas.Where(x => x.Id == id).ToList();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditarVacina(int id, [FromForm] TipoVacina vacina)
        {
            if (id != vacina.Id)
            {
                return BadRequest();
            }

            using var db = new AppDbContext();
            db.Entry(vacina).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VacinaExists(id))
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
        public async Task<IActionResult> DeleteVacina(int id)
        {
            using var db = new AppDbContext();
            var vacina = await db.TipoVacinas.FindAsync(id);

            if (vacina == null)
            {
                return NotFound();
            }

            db.TipoVacinas.Remove(vacina);
            await db.SaveChangesAsync();

            return NoContent();
        }

        private bool VacinaExists(int id)
        {
            using var db = new AppDbContext();

            return db.TipoVacinas.Any(e => e.Id == id);
        }
    }
}
