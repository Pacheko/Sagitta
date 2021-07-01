using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CalendarioCovid.Negocios.Migrations
{
    public partial class CalendarioColunaData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DataInicial",
                table: "CalendarioVacinacao",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DataInicial",
                table: "CalendarioVacinacao");
        }
    }
}
