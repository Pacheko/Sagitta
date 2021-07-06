using CalendarioCovid.Negocios.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
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
        public async Task<ActionResult<IEnumerable>> Get()
        {
            using var db = new AppDbContext();

            //db.Prioridades.Add(new CalendarioCovid.Negocios.Models.Prioridade() { NmGrupo = "Professores", IsComorbidade = false });
            //db.Prioridades.Add(new CalendarioCovid.Negocios.Models.Prioridade() { NmGrupo = "Profissionais da Saude", IsComorbidade = false });
            //db.Prioridades.Add(new CalendarioCovid.Negocios.Models.Prioridade() { NmGrupo = "Pressão Alta", IsComorbidade = true });
            //db.Prioridades.Add(new CalendarioCovid.Negocios.Models.Prioridade() { NmGrupo = "Asma", IsComorbidade = true });

            //db.SaveChanges();

            return await db.Prioridades.ToListAsync();
        }
    }
}
