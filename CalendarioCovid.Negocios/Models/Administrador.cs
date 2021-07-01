using System;
using System.Collections.Generic;
using System.Text;

namespace CalendarioCovid.Negocios.Models
{
    public class Administrador
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string Senha { get; set; }
        //public Pessoa Pessoa { get; set; }

        public Administrador() { }
        public Administrador(string login, string senha)
        {
            Login = login;
            Senha = senha;
        }
    }
}
