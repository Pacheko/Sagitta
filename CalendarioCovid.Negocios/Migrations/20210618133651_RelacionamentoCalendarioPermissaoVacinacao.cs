using Microsoft.EntityFrameworkCore.Migrations;

namespace CalendarioCovid.Negocios.Migrations
{
    public partial class RelacionamentoCalendarioPermissaoVacinacao : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_PermissaoVacinacao_CalendarioId",
                table: "PermissaoVacinacao",
                column: "CalendarioId");

            migrationBuilder.AddForeignKey(
                name: "FK_PermissaoVacinacao_CalendarioVacinacao_CalendarioId",
                table: "PermissaoVacinacao",
                column: "CalendarioId",
                principalTable: "CalendarioVacinacao",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PermissaoVacinacao_CalendarioVacinacao_CalendarioId",
                table: "PermissaoVacinacao");

            migrationBuilder.DropIndex(
                name: "IX_PermissaoVacinacao_CalendarioId",
                table: "PermissaoVacinacao");
        }
    }
}
