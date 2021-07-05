﻿// <auto-generated />
using System;
using CalendarioCovid.Negocios.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace CalendarioCovid.Negocios.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20210705005239_removeTelegram")]
    partial class removeTelegram
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.7")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("CalendarioCovid.Negocios.Models.Administrador", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Login")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Senha")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Administradores");
                });

            modelBuilder.Entity("CalendarioCovid.Negocios.Models.Calendario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CidadeId")
                        .HasColumnType("int");

                    b.Property<DateTime>("DataInicial")
                        .HasColumnType("datetime2");

                    b.Property<int>("IdadeMinima")
                        .HasColumnType("int");

                    b.Property<int>("PrioridadeId")
                        .HasColumnType("int");

                    b.Property<int>("TipoVacinaId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CidadeId");

                    b.HasIndex("PrioridadeId");

                    b.HasIndex("TipoVacinaId");

                    b.ToTable("CalendarioVacinacao");
                });

            modelBuilder.Entity("CalendarioCovid.Negocios.Models.Cidade", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("NmCidade")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NmUf")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SiglaUf")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Cidades");
                });

            modelBuilder.Entity("CalendarioCovid.Negocios.Models.Pessoa", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CPF")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("CidadeId")
                        .HasColumnType("int");

                    b.Property<string>("DataNascimento")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Fone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Idade")
                        .HasColumnType("int");

                    b.Property<bool>("IsNotificado")
                        .HasColumnType("bit");

                    b.Property<string>("Nome")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("PrioridadeId")
                        .HasColumnType("int");

                    b.Property<string>("Sexo")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("CidadeId");

                    b.HasIndex("PrioridadeId");

                    b.ToTable("Pessoas");
                });

            modelBuilder.Entity("CalendarioCovid.Negocios.Models.Prioridade", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("IsComorbidade")
                        .HasColumnType("bit");

                    b.Property<string>("NmGrupo")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Prioridades");
                });

            modelBuilder.Entity("CalendarioCovid.Negocios.Models.TipoVacina", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("NmVacina")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("QtDoses")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("TipoVacinas");
                });

            modelBuilder.Entity("CalendarioCovid.Negocios.Models.Vacinados", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DataVacinacao")
                        .HasColumnType("datetime2");

                    b.Property<int>("Dose")
                        .HasColumnType("int");

                    b.Property<int>("PessoaId")
                        .HasColumnType("int");

                    b.Property<int>("TipoVacinaId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PessoaId");

                    b.HasIndex("TipoVacinaId");

                    b.ToTable("Vacinados");
                });

            modelBuilder.Entity("CalendarioCovid.Negocios.Models.Calendario", b =>
                {
                    b.HasOne("CalendarioCovid.Negocios.Models.Cidade", "Cidade")
                        .WithMany()
                        .HasForeignKey("CidadeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CalendarioCovid.Negocios.Models.Prioridade", "Prioridade")
                        .WithMany()
                        .HasForeignKey("PrioridadeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CalendarioCovid.Negocios.Models.TipoVacina", "TipoVacina")
                        .WithMany()
                        .HasForeignKey("TipoVacinaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Cidade");

                    b.Navigation("Prioridade");

                    b.Navigation("TipoVacina");
                });

            modelBuilder.Entity("CalendarioCovid.Negocios.Models.Pessoa", b =>
                {
                    b.HasOne("CalendarioCovid.Negocios.Models.Cidade", "Cidade")
                        .WithMany()
                        .HasForeignKey("CidadeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CalendarioCovid.Negocios.Models.Prioridade", "Prioridade")
                        .WithMany()
                        .HasForeignKey("PrioridadeId");

                    b.Navigation("Cidade");

                    b.Navigation("Prioridade");
                });

            modelBuilder.Entity("CalendarioCovid.Negocios.Models.Vacinados", b =>
                {
                    b.HasOne("CalendarioCovid.Negocios.Models.Pessoa", "Pessoa")
                        .WithMany()
                        .HasForeignKey("PessoaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CalendarioCovid.Negocios.Models.TipoVacina", "TipoVacina")
                        .WithMany()
                        .HasForeignKey("TipoVacinaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Pessoa");

                    b.Navigation("TipoVacina");
                });
#pragma warning restore 612, 618
        }
    }
}
