using System;
using System.Net.Mail;

namespace CalendarioCovid.Negocios
{
    public class Mensageria
    {
        private static string mailAdSmtpClientress = "smtp.gmail.com";
        private static string mailAddress = "sagittasistemas@gmail.com";
        private static string senha = "sagittasistemas89";

        public static bool EnviarEmail(string nomePessoa, string emailPessoa, string campanha, string cidade)
        {

            string mensagem =
                $"Olá {nomePessoa}, " + Environment.NewLine + Environment.NewLine +
                $"Você já pode se vacinar pela campanha {campanha}, na cidade {cidade}.";

            try
            {
                SmtpClient cliente = new SmtpClient(mailAdSmtpClientress);
                MailMessage Message = new MailMessage();

                Message.From = new MailAddress(mailAddress);
                Message.To.Add(emailPessoa);
                Message.Body = mensagem;
                Message.Subject = "MEDICENTER - Campanha de Vacinação COVID-19";

                cliente.Credentials = new System.Net.NetworkCredential(mailAddress, senha);
                cliente.Port = 465; // porta para SSL
                cliente.EnableSsl = true; // GMail requer SSL
                cliente.DeliveryMethod = SmtpDeliveryMethod.Network; //Modo de envio
                cliente.UseDefaultCredentials = false;
                cliente.Timeout = 20000;
                cliente.Host = mailAdSmtpClientress;

                cliente.Send(Message);
            }
            catch (Exception ex)
            {
                return false;
            }

            return true;
        }
    }
}
