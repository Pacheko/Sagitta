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
            return await db.Cidades.ToListAsync();
        }
    }
}
