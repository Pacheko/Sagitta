using CalendarioCovid.Negocios.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CalendarioCovid.Negocios.Models;
using System.Net.Mail;

namespace Sagitta.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EnviarEmailController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable>> GetEnviaEmail()
        {
            using var db = new AppDbContext();
            List<Pessoa> pessoasNaoAptas = new List<Pessoa>();

            foreach (var item in db.Pessoas)
            {
                if (item.PodeVacinar())
                {
                    pessoasNaoAptas.Add(item);
                }
            }

            var query =
               from pessoa in pessoasNaoAptas
               from cidade in db.Cidades
               .Where(x => x.Id == pessoa.CidadeId & pessoa.IsNotificado == false & pessoa.SolicitaEmail == true)
               select new
               {
                   Id = pessoa.Id,
                   Email = pessoa.Email
               };

            foreach (var item in query)
            {
                var email = item.Email;
                var id = item.Id;
                EnviaEmailJa(email);
                using var bd = new AppDbContext();

                Pessoa pessoas = bd.Pessoas.Find(id);
                pessoas.IsNotificado = true;
                bd.Entry(pessoas).State = EntityState.Modified;
                bd.SaveChanges();
            }

            try
            {
                return query.ToArray();
            }
            catch (Exception ex)
            {
                return NotFound();
            }
        }

        public void EnviaEmailJa(string email)
        {
            string remetenteEmail = "sagittasistemas@gmail.com"; //O e-mail do remetente

            MailMessage mail = new MailMessage();
            mail.To.Add(email);
            mail.From = new MailAddress(remetenteEmail, "MEDICENTER", System.Text.Encoding.UTF8);
            mail.Subject = "Chegou sua vez!";
            mail.SubjectEncoding = System.Text.Encoding.UTF8;
            mail.Body = "<div>Olá tudo bem?</div></br><div>Chegou sua vez, a Medicenter te informa que você já pode se vacinar!";
            mail.BodyEncoding = System.Text.Encoding.UTF8;
            mail.IsBodyHtml = true;
            mail.Priority = MailPriority.High; //Prioridade do E-Mail
            SmtpClient client = new SmtpClient();  //Adicionando as credenciais do seu e-mail e senha:
            client.Credentials = new System.Net.NetworkCredential(remetenteEmail, "sagittasistemas89");
            client.Port = 587; // Esta porta é a utilizada pelo Gmail para envio
            client.Host = "smtp.gmail.com"; //Definindo o provedor que irá disparar o e-mail
            client.EnableSsl = true; //Gmail trabalha com Server Secured Layer

            try
            {
                client.Send(mail);
            }
            catch (Exception ex)
            {
            }
        }
    }
}
