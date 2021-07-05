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
        public string Cidade { get; set; }
        public string Estado { get; set; }
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


            //foreach (var item in db.Cidades)
            //{
            //    db.Cidades.Remove(item);
            //}
            //db.SaveChanges();

            //Cidade c1 = new Cidade()
            //{
            //    NmCidade = "Venâncio Aires",
            //    NmUf = "Rio Grande do Sul",
            //    SiglaUf = "RS"
            //};
            //Cidade c2 = new Cidade()
            //{
            //    NmCidade = "Santa Cruz do Sul",
            //    NmUf = "Rio Grande do Sul",
            //    SiglaUf = "RS"
            //};
            //Cidade c3 = new Cidade()
            //{
            //    NmCidade = "Montenegro",
            //    NmUf = "Rio Grande do Sul",
            //    SiglaUf = "RS"
            //};

            //db.Cidades.AddRange(c1, c2, c3);
            //db.SaveChanges();

            //Pessoa a = new Pessoa()
            //{
            //    CPF = "123",
            //    Nome = "João",
            //    DataNascimento = "12/03/1988",
            //    Fone = "132456",
            //    Email = "adsffas@fdsaf.com",
            //    Idade = 55,
            //    Sexo = "Masculino",
            //    Telegram = "asdfw",
            //    Cidade = c
            //};
            //Pessoa a = new Pessoa()
            //{
            //    CPF = "53425",
            //    Nome = "Adão",
            //    DataNascimento = "07/03/1989",
            //    Fone = "132456",
            //    Email = "adsffas@fdsaf.com",
            //    Idade = 32,
            //    Sexo = "Masculino",
            //    Telegram = "asdfw",
            //    Cidade = c
            //};

            //db.Cidades.Add(c);
            //db.Pessoas.Add(a);

            db.SaveChanges();


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
                   Cidade = cidade.NmCidade,
                   Estado = cidade.SiglaUf,
                   Grupo = prioridade.NmGrupo ?? "Sem Prioridade",
                   Notificado = pessoa.IsNotificado == true ? "Sim" : "Não"
               };

            return await query.ToListAsync();
        }

        [HttpGet("{asdf}")]
        public async Task<ActionResult<IEnumerable>> GetPessoasAptasVacina(string asdf)
        {
            using var db = new AppDbContext();

            //Cidade c = new Cidade()
            //{
            //    NmCidade = "Venâncio Aires",
            //    NmUf = "Rio Grande do Sul",
            //    SiglaUf = "RS"
            //};

            //Pessoa a = new Pessoa()
            //{
            //    CPF = "123",
            //    Nome = "João",
            //    DataNascimento = "12/03/1988",
            //    Fone = "132456",
            //    Email = "adsffas@fdsaf.com",
            //    Idade = 55,
            //    Sexo = "Masculino",
            //    Telegram = "asdfw",
            //    Cidade = c
            //};
            //Pessoa a = new Pessoa()
            //{
            //    CPF = "53425",
            //    Nome = "Adão",
            //    DataNascimento = "07/03/1989",
            //    Fone = "132456",
            //    Email = "adsffas@fdsaf.com",
            //    Idade = 32,
            //    Sexo = "Masculino",
            //    Telegram = "asdfw",
            //    Cidade = c
            //};

            //db.Cidades.Add(c);
            //db.Pessoas.Add(a);

            db.SaveChanges();


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
                   Cidade = cidade.NmCidade,
                   Estado = cidade.SiglaUf,
                   Grupo = prioridade.NmGrupo ?? "Sem Prioridade",
                   Notificado = pessoa.IsNotificado == true ? "Sim" : "Não"
               };

            return await query.ToListAsync();
        }

        [HttpGet("{vacinadas}")]
        public IEnumerable<Pessoa> GetPessoasVacinadas(string vacinadas)
        {
            using var db = new AppDbContext();

            return db.Pessoas.Where(x => x.Id == 1).ToList();
        }

        [HttpPost]
        public async void PostProduto([FromForm] Pessoa pessoa)
        {
            using var db = new AppDbContext();

            db.Pessoas.Add(pessoa);
            db.SaveChanges();


        }
    }
}
