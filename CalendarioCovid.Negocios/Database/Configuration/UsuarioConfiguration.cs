using CalendarioCovid.Negocios.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace CalendarioCovid.Negocios.Database.Configuration
{
    public class UsuarioConfiguration : IEntityTypeConfiguration<Administrador>
    {
        public void Configure(EntityTypeBuilder<Administrador> builder)
        {
            //builder.ToTable("cad_empresa");
            builder.HasKey(tb => tb.Id);
        }
    }
}
