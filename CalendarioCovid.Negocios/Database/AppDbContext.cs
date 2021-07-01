using CalendarioCovid.Negocios.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;

namespace CalendarioCovid.Negocios.Database
{
    public class AppDbContext : DbContext
    {
        private static readonly ILoggerFactory logger = LoggerFactory.Create(p => p.AddConsole());

        public DbSet<Administrador> Administradores { get; set; }
        public DbSet<Pessoa> Pessoas { get; set; }
        public DbSet<Calendario> CalendarioVacinacao { get; set; }
        public DbSet<PermissaoVacinacao> PermissaoVacinacao { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder
                    //.UseLoggerFactory(logger)
                   //.EnableSensitiveDataLogging()
                    .UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=[AbsoluteFolderPath]\\Database\\DbSagitta.MDF;UID=sagitta;PASSWORD='12345';Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
            }

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<Pessoa>()
            //    .HasOne(a => a.Usuario)
            //    .WithOne(b => b.Pessoa)
            //    .HasForeignKey<Usuario>(b => b.Id);


            modelBuilder.Entity<PermissaoVacinacao>()
                .HasOne(a => a.Pessoa)
                .WithMany(b => b.PermissaoVacinacao);
            //.HasForeignKey<Pessoa>(b => b.PessoaId);


            modelBuilder.Entity<PermissaoVacinacao>()
                .HasOne(a => a.Calendario);

        }
    }
}
