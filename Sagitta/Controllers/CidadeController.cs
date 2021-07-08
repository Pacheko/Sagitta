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
    public class CidadeController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable>> GetTodasCidades()
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


            return await db.Cidades.ToArrayAsync();
        }


        [HttpPost]
        public async Task<ActionResult<Cidade>> PostNovaCidade([FromForm] Cidade cidade)
        {
            using var db = new AppDbContext();

            db.Cidades.Add(cidade);

            await db.SaveChangesAsync();

            return CreatedAtAction("GetTodasCidades", new { id = cidade.Id }, cidade);
        }

        [HttpGet("{id}")]
        public async Task<IEnumerable<Cidade>> CarregarCidadeAsync(int id)
        {

            using var db = new AppDbContext();

            var cidade = await db.Cidades.FindAsync(id);

            if (cidade == null)
            {
                return (IEnumerable<Cidade>)NotFound();
            }

            return db.Cidades.Where(x => x.Id == id).ToList();

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditarCidade(int id, [FromForm] Cidade cidade)
        {
            if (id != cidade.Id)
            {
                return BadRequest();
            }

            using var db = new AppDbContext();

            db.Entry(cidade).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CidadeExists(id))
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
        public async Task<IActionResult> DeleteCidade(int id)
        {
            using var db = new AppDbContext();

            var cidade = await db.Cidades.FindAsync(id);
            if (cidade == null)
            {
                return NotFound();
            }

            db.Cidades.Remove(cidade);
            await db.SaveChangesAsync();

            return NoContent();
        }

        private bool CidadeExists(int id)
        {
            using var db = new AppDbContext();

            return db.Cidades.Any(e => e.Id == id);
        }
    }
}
