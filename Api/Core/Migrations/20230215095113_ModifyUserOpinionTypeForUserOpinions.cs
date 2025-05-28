using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    public partial class ModifyUserOpinionTypeForUserOpinions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UseOpinionType",
                schema: "Support",
                table: "UserOpinions",
                newName: "UserOpinionType");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserOpinionType",
                schema: "Support",
                table: "UserOpinions",
                newName: "UseOpinionType");
        }
    }
}
