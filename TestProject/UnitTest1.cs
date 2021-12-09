using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestProject
{
    public class Tests
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public async Task TestCadastroAdministrador()
        {
            Sagitta.Controllers.AdministradoresController administradoresController = new Sagitta.Controllers.AdministradoresController();

            CalendarioCovid.Negocios.Models.Administrador administrador = new CalendarioCovid.Negocios.Models.Administrador();

            administrador.Login = "teste";
            administrador.Senha = "teste";

            await administradoresController.PostNovoCadastro(administrador);

            CalendarioCovid.Negocios.Database.AppDbContext dbContext = new CalendarioCovid.Negocios.Database.AppDbContext();

            var result = dbContext.Administradores.FirstOrDefault(x => x.Login == administrador.Login && x.Senha == administrador.Senha);

            if (result == null) Assert.Fail();
            else Assert.Pass();
        }

        [Test]
        public async Task TestExclusaoAdministrador()
        {
            Sagitta.Controllers.AdministradoresController administradoresController = new Sagitta.Controllers.AdministradoresController();

            CalendarioCovid.Negocios.Models.Administrador administrador = new CalendarioCovid.Negocios.Models.Administrador();

            administrador.Login = "teste";
            administrador.Senha = "teste";

            CalendarioCovid.Negocios.Database.AppDbContext dbContext = new CalendarioCovid.Negocios.Database.AppDbContext();


            var admTeste = dbContext.Administradores.FirstOrDefault(x => x.Login == administrador.Login && x.Senha == administrador.Senha);

            if (admTeste == null) Assert.Fail("Usuário não existe.");

            await administradoresController.DeleteAdm(admTeste.Id);


            var result = dbContext.Administradores.FirstOrDefault(x => x.Login == administrador.Login && x.Senha == "teste");

            if (result == null) Assert.Pass();
            else Assert.Fail("Falha ao deletar usuário.");
        }
    }
}