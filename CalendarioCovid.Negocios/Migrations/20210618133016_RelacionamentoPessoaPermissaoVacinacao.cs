using Microsoft.EntityFrameworkCore.Migrations;

namespace CalendarioCovid.Negocios.Migrations
{
    public partial class RelacionamentoPessoaPermissaoVacinacao : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_PermissaoVacinacao_PessoaId",
                table: "PermissaoVacinacao",
                column: "PessoaId");

            migrationBuilder.AddForeignKey(
                name: "FK_PermissaoVacinacao_Pessoas_PessoaId",
                table: "PermissaoVacinacao",
                column: "PessoaId",
                principalTable: "Pessoas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PermissaoVacinacao_Pessoas_PessoaId",
                table: "PermissaoVacinacao");

            migrationBuilder.DropIndex(
                name: "IX_PermissaoVacinacao_PessoaId",
                table: "PermissaoVacinacao");
        }
    }
}
