using Microsoft.EntityFrameworkCore.Migrations;

namespace CalendarioCovid.Negocios.Migrations
{
    public partial class Calendario : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CalendarioVacinacao",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Evento = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IdadeMinima = table.Column<int>(type: "int", nullable: false),
                    ExigenciaComorbidade = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CalendarioVacinacao", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CalendarioVacinacao");
        }
    }
}
