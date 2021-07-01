using CalendarioCovid.Negocios.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CalendarioCovid.Negocios.Models
{
    public class Pessoa
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string CPF { get; set; }
        public int Idade { get; set; }
        public string Sexo { get; set; }
        public string Fone { get; set; }
        //public string Telegram { get; set; }
        public string Email { get; set; }
        public string DataNascimento { get; set; }
        public string Cidade { get; set; }
        public string Estado { get; set; }
        //public bool TemComorbidade { get; set; }
        //public string Comorbidade { get; set; }
        //public int UsuarioId { get; set; }
        //public Administrador Usuario { get; set; }
        public List<PermissaoVacinacao> PermissaoVacinacao { get; set; }

        public Pessoa() { }

        public string GetInfo()
        {
            return $"Nome: {Nome} CPF: {CPF} Idade: {Idade}";
        }

        //public bool PodeVacinar()
        //{
        //    using (var database = new AppDbContext())
        //    {
        //        var calendario = database.CalendarioVacinacao.FirstOrDefault(x => x.ExigenciaComorbidade == TemComorbidade && x.IdadeMinima < Idade && x.DataInicial <= DateTime.Now);

        //        if (calendario != null)
        //        {
        //            return true;
        //        }
        //        else
        //        {
        //            return false;
        //        }
        //    }
        //}

        public bool PodeVacinar(out string retorno)
        {
            using (var database = new AppDbContext())
            {
                //var calendario = database.CalendarioVacinacao.FirstOrDefault(x => x.ExigenciaComorbidade == TemComorbidade && x.IdadeMinima < Idade && x.DataInicial <= DateTime.Now);
                var calendario = database.CalendarioVacinacao.FirstOrDefault(x => x.IdadeMinima < Idade && x.DataInicial <= DateTime.Now);

                if (calendario != null)
                {
                    retorno = $"Pode se vacinar pela campanha: {calendario.Evento} data de inicio: {calendario.DataInicial.ToShortDateString()}";
                    return true;
                }
                else
                {
                    retorno = "Não pode se vacinar";
                    return false;
                }
            }
        }

        public static bool PodeVacinar(string cpf, out string retorno)
        {
            using (var database = new AppDbContext())
            {
                var pessoa = database.Pessoas.FirstOrDefault(x => x.CPF == cpf);

                if (pessoa == null)
                {
                    retorno = $"CPF: {cpf} não encontrado.";
                    return false;
                }

                //var calendario = database.CalendarioVacinacao.FirstOrDefault(x => x.ExigenciaComorbidade == pessoa.TemComorbidade && x.IdadeMinima < pessoa.Idade && x.DataInicial <= DateTime.Now);
                var calendario = database.CalendarioVacinacao.FirstOrDefault(x => x.IdadeMinima < pessoa.Idade && x.DataInicial <= DateTime.Now);

                if (calendario != null)
                {
                    retorno = $"{pessoa.Nome} pode se vacinar pela campanha: {calendario.Evento} data de inicio: {calendario.DataInicial.ToShortDateString()}";
                    return true;
                }
                else
                {
                    retorno = "Não pode se vacinar";
                    return false;
                }
            }
        }


        //public string PrintUsuario()
        //{
        //    return $"Login: {Usuario.Login} Senha: {Usuario.Senha}";
        //}
    }
}
