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
    public class AdministradoresController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable>> GetADM()
        {

            using var db = new AppDbContext();

            return await db.Administradores.ToArrayAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Administrador>> PostNovoCadastro([FromForm] Administrador adm)
        {
            using var db = new AppDbContext();

            adm.Senha = Cripto.sha256encrypt(adm.Senha);

            db.Administradores.Add(adm);

            await db.SaveChangesAsync();


            return CreatedAtAction("GetADM", new { id = adm.Id }, adm);
        }

        [HttpGet("{id}")]
        public async Task<IEnumerable<Administrador>> CarregarAdmAsync(int id)
        {

            using var db = new AppDbContext();

            var adm = await db.Administradores.FindAsync(id);

            if (adm == null)
            {
                return (IEnumerable<Administrador>)NotFound();
            }

            return db.Administradores.Where(x => x.Id == id).ToList();

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditarAdm(int id, [FromForm] Administrador adm)
        {
            if (id != adm.Id)
            {
                return BadRequest();
            }

            using var db = new AppDbContext();

            db.Entry(adm).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdmExists(id))
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
        public async Task<IActionResult> DeleteAdm(int id)
        {
            using var db = new AppDbContext();

            var adm = await db.Administradores.FindAsync(id);
            if (adm == null)
            {
                return NotFound();
            }

            db.Administradores.Remove(adm);
            await db.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{login}")]
        public async Task<ActionResult<IEnumerable>> CarregarLoginAsync([FromForm] Administrador adm)
        {
            using var db = new AppDbContext();

            //db.Administradores.Add(new Administrador() { Login = "admin", Senha = "admin" });
            //db.SaveChanges();

            string senhaEnc = Cripto.sha256encrypt(adm.Senha);

            return await db.Administradores.Where(x => x.Login == adm.Login & x.Senha == senhaEnc).ToArrayAsync();
        }

        private bool AdmExists(int id)
        {
            using var db = new AppDbContext();
            return db.Administradores.Any(e => e.Id == id);
        }
    }
}

