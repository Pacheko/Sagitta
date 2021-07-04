using Microsoft.EntityFrameworkCore.Migrations;

namespace CalendarioCovid.Negocios.Migrations
{
    public partial class RelacaoPessoaPrioridade : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pessoas_Prioridades_PrioridadeId",
                table: "Pessoas");

            migrationBuilder.AlterColumn<int>(
                name: "PrioridadeId",
                table: "Pessoas",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Pessoas_Prioridades_PrioridadeId",
                table: "Pessoas",
                column: "PrioridadeId",
                principalTable: "Prioridades",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pessoas_Prioridades_PrioridadeId",
                table: "Pessoas");

            migrationBuilder.AlterColumn<int>(
                name: "PrioridadeId",
                table: "Pessoas",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Pessoas_Prioridades_PrioridadeId",
                table: "Pessoas",
                column: "PrioridadeId",
                principalTable: "Prioridades",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
