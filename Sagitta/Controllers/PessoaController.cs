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
    public class retorno
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string CPF { get; set; }
        public int Idade { get; set; }
        public string Sexo { get; set; }
        public string Fone { get; set; }
        public string Email { get; set; }
        public string DataNascimento { get; set; }
        public int CidadeId { get; set; }
        public string Cidade { get; set; }
        public string Estado { get; set; }
        public int PrioridadeId { get; set; }
        public string Grupo { get; set; }
        public string Notificado { get; set; }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class PessoaController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable>> Get()
        {
            using var db = new AppDbContext();

            var query =
               from pessoa in db.Pessoas
               from cidade in db.Cidades
               .Where(x => x.Id == pessoa.CidadeId)
               from prioridade in db.Prioridades
               .Where(prioridade => (prioridade.Id == pessoa.PrioridadeId || prioridade == null)).DefaultIfEmpty()
               select new retorno()
               {
                   Nome = pessoa.Nome,
                   CPF = pessoa.CPF,
                   Idade = pessoa.Idade,
                   Sexo = pessoa.Sexo,
                   Fone = pessoa.Fone,
                   Email = pessoa.Email,
                   DataNascimento = pessoa.DataNascimento,
                   CidadeId = cidade.Id,
                   Cidade = cidade.NmCidade,
                   Estado = cidade.SiglaUf,
                   PrioridadeId = prioridade.Id,
                   Grupo = prioridade.NmGrupo ?? "Sem Prioridade",
                   Notificado = pessoa.IsNotificado == true ? "Sim" : "Não"
               };

            return await query.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable>> CarregarPessoaAsync(int id)
        {

            using var db = new AppDbContext();

            var pessoa2 = await db.Pessoas.FindAsync(id);

            if (pessoa2 == null)
            {
                return NotFound();
            }

            var pessoaRegistro = from pessoa in db.Pessoas
                                 join prioridade in db.Prioridades on pessoa.PrioridadeId equals prioridade.Id
                                 join calendario in db.CalendarioVacinacao on prioridade.Id equals calendario.PrioridadeId
                                 where pessoa.Id == id
                                 
                                 select new
                                  {
                                      pessoa.Id,
                                      pessoa.Nome,
                                      pessoa.Idade,
                                      calendario.IdadeMinima,
                                      DataInicial = calendario.DataInicial.ToString("dd/MM/yyyy"),
                                      DataHoje = DateTime.Now.ToString("dd/MM/yyyy"),
                                      DataInicialCompleta = calendario.DataInicial,
                                      DataHojeCompleta = DateTime.Now
                                 };

            return await pessoaRegistro.ToListAsync();

        }

        //[HttpGet("{aptasVacina}")]
        //public async Task<ActionResult<IEnumerable>> GetPessoasAptasVacina()
        //{
        //    using var db = new AppDbContext();

        //    List<Pessoa> lstPessoa = new List<Pessoa>();

        //    for (int i = 0; i < db.Pessoas.Count() - 1; i++)
        //    {
        //        if(db.Pessoas.ToList()[i].PodeVacinar())
        //        {
        //            lstPessoa.Add(db.Pessoas.ToList()[i]);
        //        }
        //    }

        //    var query =
        //       from pessoa in lstPessoa
        //       from cidade in db.Cidades
        //       .Where(x => x.Id == pessoa.CidadeId)
        //       from prioridade in db.Prioridades
        //       .Where(prioridade => (prioridade.Id == pessoa.PrioridadeId || prioridade == null)).DefaultIfEmpty()
        //       select new retorno()
        //       {
        //           Nome = pessoa.Nome,
        //           CPF = pessoa.CPF,
        //           Idade = pessoa.Idade,
        //           Sexo = pessoa.Sexo,
        //           Fone = pessoa.Fone,
        //           Email = pessoa.Email,
        //           DataNascimento = pessoa.DataNascimento,
        //           CidadeId = cidade.Id,
        //           Cidade = cidade.NmCidade,
        //           Estado = cidade.SiglaUf,
        //           PrioridadeId = prioridade.Id,
        //           Grupo = prioridade.NmGrupo ?? "Sem Prioridade",
        //           Notificado = pessoa.IsNotificado == true ? "Sim" : "Não"
        //       };


        //    return query.ToList();
        //}

        

        [HttpPost]
        public async void PostNovoCadastro([FromForm] Pessoa pessoa)
        {
            using var db = new AppDbContext();

            var semPrioridade = db.Prioridades.First(x => x.NmGrupo == "Sem Prioridade");

            if (pessoa.PrioridadeId == semPrioridade.Id)
            {
                pessoa.PrioridadeId = 1;
            }

            db.Pessoas.Add(pessoa);
            db.SaveChanges();
        }
    }
}
