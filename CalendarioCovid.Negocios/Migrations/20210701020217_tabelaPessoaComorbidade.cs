using Microsoft.EntityFrameworkCore.Migrations;

namespace CalendarioCovid.Negocios.Migrations
{
    public partial class tabelaPessoaComorbidade : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Comorbidade",
                table: "Pessoas");

            migrationBuilder.DropColumn(
                name: "Telegram",
                table: "Pessoas");

            migrationBuilder.DropColumn(
                name: "TemComorbidade",
                table: "Pessoas");

            migrationBuilder.DropColumn(
                name: "UsuarioId",
                table: "Pessoas");

            migrationBuilder.CreateTable(
                name: "PessoaComorbidades",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PessoaId = table.Column<int>(type: "int", nullable: false),
                    ComorbidadeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PessoaComorbidades", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PessoaComorbidades_Comorbidades_ComorbidadeId",
                        column: x => x.ComorbidadeId,
                        principalTable: "Comorbidades",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PessoaComorbidades_Pessoas_PessoaId",
                        column: x => x.PessoaId,
                        principalTable: "Pessoas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PessoaComorbidades_ComorbidadeId",
                table: "PessoaComorbidades",
                column: "ComorbidadeId");

            migrationBuilder.CreateIndex(
                name: "IX_PessoaComorbidades_PessoaId",
                table: "PessoaComorbidades",
                column: "PessoaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PessoaComorbidades");

            migrationBuilder.AddColumn<string>(
                name: "Comorbidade",
                table: "Pessoas",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Telegram",
                table: "Pessoas",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "TemComorbidade",
                table: "Pessoas",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "UsuarioId",
                table: "Pessoas",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
