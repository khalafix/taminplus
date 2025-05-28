using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    public partial class ModifyUserOpinionDetailForTbl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Remark",
                schema: "Support",
                table: "UserOpinionDetails",
                type: "nvarchar(512)",
                maxLength: 512,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Remark",
                schema: "Support",
                table: "UserOpinionDetails");
        }
    }
}
