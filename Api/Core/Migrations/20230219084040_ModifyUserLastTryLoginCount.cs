using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    public partial class ModifyUserLastTryLoginCount : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LoginfailedDate",
                schema: "Security",
                table: "Users",
                newName: "LoginfailedCount");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LoginfailedCount",
                schema: "Security",
                table: "Users",
                newName: "LoginfailedDate");
        }
    }
}
