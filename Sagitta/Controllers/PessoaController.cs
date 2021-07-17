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

    public class retorno1
    {
        public int IdadeMinima { get; set; }      
    }

    public class retorno2
    {
        public int IdadeMinima { get; set; }
        public bool Comorbidade { get; set; }
    }

    public class retorno3
    {
        public int IdadeMinima { get; set; }
    }

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

            var teste = new retorno();

            if (teste.CidadeId == 4)
            {

            }

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

            
            

            var registropessoa = from pessoa in db.Pessoas
                                 join prioridade in db.Prioridades on pessoa.PrioridadeId equals prioridade.Id
                                 join calendario in db.CalendarioVacinacao on prioridade.Id equals calendario.PrioridadeId
                                 select new
                                 {
                                     pessoa.Id,
                                     pessoa.Nome,
                                     pessoa.Idade,
                                     pessoa.Email,
                                     calendario.IdadeMinima,
                                     DataInicial = calendario.DataInicial.ToString("dd/MM/yyyy"),
                                     DataHoje = DateTime.Now.ToString("dd/MM/yyyy"),
                                     DataInicialCompleta = calendario.DataInicial,
                                     DataHojeCompleta = DateTime.Now
                                 };

            var pessoaRegistro2 = from calendario in db.CalendarioVacinacao
                                  join prioridade in db.Prioridades on calendario.PrioridadeId equals prioridade.Id
                                  where prioridade.IsComorbidade == false
                                  orderby calendario.IdadeMinima ascending

                                  select new
                                 {
                                     IdadeMinima = calendario.IdadeMinima                                  
                                 };

            var pessoaRegistro4 = from calendario in db.CalendarioVacinacao
                                  join prioridade in db.Prioridades on calendario.PrioridadeId equals prioridade.Id
                                  join pessoa in db.Pessoas on prioridade.Id equals pessoa.PrioridadeId
                                  where pessoa.Id == id
                                  orderby calendario.IdadeMinima ascending

                                  select new retorno3()
                                  {
                                      IdadeMinima = calendario.IdadeMinima
                                  };

            

            var pessoaRegistro3 = from pessoa in db.Pessoas
                                  join prioridade in db.Prioridades on pessoa.PrioridadeId equals prioridade.Id
                                  join calendario in db.CalendarioVacinacao on prioridade.Id equals calendario.PrioridadeId
                                  where pessoa.Id == id

                                  select new retorno2()
                                  {                                    
                                      Comorbidade = prioridade.IsComorbidade
                                  };


            var query1 = pessoaRegistro2.First();
            var query2 = pessoaRegistro3.First();
            var query3 = pessoaRegistro4.First();
                     

            if (query3.IdadeMinima != 0)
            {
                if (query2.Comorbidade == true && query3.IdadeMinima > query1.IdadeMinima && query1.IdadeMinima != 0)
                {
                        registropessoa = from pessoa in db.Pessoas
                                          .Where(x => x.Id == id)
                                          from calendario in db.CalendarioVacinacao
                                          join prioridade in db.Prioridades on calendario.PrioridadeId equals prioridade.Id
                                          where prioridade.IsComorbidade == false & calendario.IdadeMinima == (db.CalendarioVacinacao.Where(r => 1 == 1).Min(c => c.IdadeMinima))

                                          select new
                                          {
                                              pessoa.Id,
                                              pessoa.Nome,
                                              pessoa.Idade,
                                              pessoa.Email,
                                              calendario.IdadeMinima,
                                              DataInicial = calendario.DataInicial.ToString("dd/MM/yyyy"),
                                              DataHoje = DateTime.Now.ToString("dd/MM/yyyy"),
                                              DataInicialCompleta = calendario.DataInicial,
                                              DataHojeCompleta = DateTime.Now
                                          };

                    return await registropessoa.ToListAsync();

                }
                else if (query2.Comorbidade == false && query3.IdadeMinima > query1.IdadeMinima && query1.IdadeMinima != 0)
                {
                        registropessoa = from pessoa in db.Pessoas
                                          .Where(x => x.Id == id)
                                          from calendario in db.CalendarioVacinacao
                                          join prioridade in db.Prioridades on calendario.PrioridadeId equals prioridade.Id
                                          where prioridade.IsComorbidade == false & calendario.IdadeMinima == (db.CalendarioVacinacao.Where(r => 1 == 1).Min(c => c.IdadeMinima))

                                          select new
                                          {
                                              pessoa.Id,
                                              pessoa.Nome,
                                              pessoa.Idade,
                                              pessoa.Email,
                                              calendario.IdadeMinima,
                                              DataInicial = calendario.DataInicial.ToString("dd/MM/yyyy"),
                                              DataHoje = DateTime.Now.ToString("dd/MM/yyyy"),
                                              DataInicialCompleta = calendario.DataInicial,
                                              DataHojeCompleta = DateTime.Now
                                          };

                    return await registropessoa.ToListAsync();
                }
                else if (query2.Comorbidade == true && query3.IdadeMinima <= query1.IdadeMinima && query1.IdadeMinima != 0)
                {
                        registropessoa = from pessoa in db.Pessoas
                                         join prioridade in db.Prioridades on pessoa.PrioridadeId equals prioridade.Id
                                         join calendario in db.CalendarioVacinacao on prioridade.Id equals calendario.PrioridadeId
                                         where pessoa.Id == id & calendario.IdadeMinima == (query3.IdadeMinima)
                                       

                                         select new
                                         {
                                             pessoa.Id,
                                             pessoa.Nome,
                                             pessoa.Idade,
                                             pessoa.Email,
                                             calendario.IdadeMinima,
                                             DataInicial = calendario.DataInicial.ToString("dd/MM/yyyy"),
                                             DataHoje = DateTime.Now.ToString("dd/MM/yyyy"),
                                             DataInicialCompleta = calendario.DataInicial,
                                             DataHojeCompleta = DateTime.Now
                                         };

                    return await registropessoa.ToListAsync();

                }
                else if (query2.Comorbidade == false && query3.IdadeMinima <= query1.IdadeMinima && query1.IdadeMinima != 0)
                {
                        registropessoa = from pessoa in db.Pessoas
                                         join prioridade in db.Prioridades on pessoa.PrioridadeId equals prioridade.Id
                                         join calendario in db.CalendarioVacinacao on prioridade.Id equals calendario.PrioridadeId
                                         where pessoa.Id == id & calendario.IdadeMinima == (query3.IdadeMinima)

                                         select new
                                         {
                                             pessoa.Id,
                                             pessoa.Nome,
                                             pessoa.Idade,
                                             pessoa.Email,
                                             calendario.IdadeMinima,
                                             DataInicial = calendario.DataInicial.ToString("dd/MM/yyyy"),
                                             DataHoje = DateTime.Now.ToString("dd/MM/yyyy"),
                                             DataInicialCompleta = calendario.DataInicial,
                                             DataHojeCompleta = DateTime.Now
                                         };

                    return await registropessoa.ToListAsync();
                } else
                {
                    registropessoa = from pessoa in db.Pessoas
                                          .Where(x => x.Id == id)
                                     from calendario in db.CalendarioVacinacao
                                     join prioridade in db.Prioridades on calendario.PrioridadeId equals prioridade.Id
                                     where prioridade.IsComorbidade == false & calendario.IdadeMinima == (db.CalendarioVacinacao.Where(r => 1 == 1).Min(c => c.IdadeMinima))

                                     select new
                                     {
                                         pessoa.Id,
                                         pessoa.Nome,
                                         pessoa.Idade,
                                         pessoa.Email,
                                         IdadeMinima = 200,
                                         DataInicial = DateTime.Now.AddDays(5).ToString("dd/MM/yyyy"),
                                         DataHoje = DateTime.Now.ToString("dd/MM/yyyy"),
                                         DataInicialCompleta = DateTime.Now.AddDays(5),
                                         DataHojeCompleta = DateTime.Now
                                     };

                    return await registropessoa.ToListAsync();
                }

            } else
            {
                    registropessoa = from pessoa in db.Pessoas
                                          .Where(x => x.Id == id)
                                      from calendario in db.CalendarioVacinacao
                                      join prioridade in db.Prioridades on calendario.PrioridadeId equals prioridade.Id
                                      where prioridade.IsComorbidade == false & calendario.IdadeMinima == (db.CalendarioVacinacao.Where(r => 1 == 1).Min(c => c.IdadeMinima))

                                      select new
                                      {
                                          pessoa.Id,
                                          pessoa.Nome,
                                          pessoa.Idade,
                                          pessoa.Email,
                                          IdadeMinima = 200,
                                          DataInicial = DateTime.Now.AddDays(5).ToString("dd/MM/yyyy"),
                                          DataHoje = DateTime.Now.ToString("dd/MM/yyyy"),
                                          DataInicialCompleta = DateTime.Now.AddDays(5),
                                          DataHojeCompleta = DateTime.Now
                                      };

                return await registropessoa.ToListAsync();
            }
                return await registropessoa.ToListAsync(); 
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EnviaEmail(int id)
        {
            using var db = new AppDbContext();

            Pessoa enviaremail = db.Pessoas.First(p => p.Id == id);

            enviaremail.SolicitaEmail = true;

            await db.SaveChangesAsync();

            return NoContent();
        }
      
        [HttpPost]
        public async Task<ActionResult<IEnumerable>> PostNovoCadastro([FromForm] Pessoa pessoa)
        {
            using var db = new AppDbContext();

            var semPrioridade = db.Prioridades.First(x => x.NmGrupo == "Sem Prioridade");

            if (pessoa.PrioridadeId == semPrioridade.Id)
            {
                pessoa.PrioridadeId = 1;
            }

            db.Pessoas.Add(pessoa);
            db.SaveChanges();

            var pessoaRegistro = from pessoas in db.Pessoas                                
                                 where pessoas.Id == pessoa.Id

                                 select new
                                 {
                                     pessoas.Id,
                                     pessoas.Nome,
                                     pessoas.Idade                                  
                                 };

            return await pessoaRegistro.ToListAsync();

        }
    }
}
