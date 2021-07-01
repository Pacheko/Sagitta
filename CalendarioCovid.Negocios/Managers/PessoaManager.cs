using CalendarioCovid.Negocios.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CalendarioCovid.Negocios.Managers
{
    public class PessoaManager
    {
        public static IEnumerable<Models.Pessoa> Consulta()
        {
            using var db = new AppDbContext();

            var consulta = db.Pessoas
                .Where(x => x.Id > 0)
                .ToList();

            return consulta;
        }

        public static bool Adiciona(string nome, string cpf, int idade, string sexo, string fone,
            string telegram, string email, string dataNascimento, string cidade,
            string estado, bool temComorbidade, string comorbidade, string login, string senha)
        {
            var pessoa1 = new Models.Pessoa
            {
                Nome = nome,
                CPF = cpf,
                Idade = idade,
                Sexo = sexo,
                Fone = fone,
                Telegram = telegram,
                Email = email,
                DataNascimento = dataNascimento,
                Cidade = cidade,
                Estado = estado,
                TemComorbidade = temComorbidade,
                Comorbidade = comorbidade
            };




            using var db = new AppDbContext();

            db.Pessoas.Add(pessoa1);

            var registros = db.SaveChanges();



            return true;
        }
    }
}
