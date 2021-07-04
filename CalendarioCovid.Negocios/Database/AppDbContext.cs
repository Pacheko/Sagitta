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
        public DbSet<Administrador> Administradores { get; set; }
        public DbSet<Calendario> CalendarioVacinacao { get; set; }
        public DbSet<Cidade> Cidades { get; set; }
        public DbSet<Pessoa> Pessoas { get; set; }
        public DbSet<Prioridade> Prioridades { get; set; }
        public DbSet<TipoVacina> TipoVacinas { get; set; }
        public DbSet<Vacinados> Vacinados { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder
                    .UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=[AbsoluteFolderPath]\\Database\\DbSagitta.MDF;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
            }

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }
    }
}
