using CalendarioCovid.Negocios.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace CalendarioCovid.Negocios.Database.Configuration
{
    public class PessoaConfiguration : IEntityTypeConfiguration<Pessoa>
    {
        public void Configure(EntityTypeBuilder<Pessoa> builder)
        {
            //builder.ToTable("cad_empresa");
            builder.HasKey(tb => tb.Id);

            builder.Property(tb => tb.IsNotificado).HasDefaultValueSql("0").ValueGeneratedOnAdd();
        }
    }
}
