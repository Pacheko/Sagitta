using Microsoft.EntityFrameworkCore.Migrations;

namespace CalendarioCovid.Negocios.Migrations
{
    public partial class removeTelegram : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Telegram",
                table: "Pessoas");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Telegram",
                table: "Pessoas",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
