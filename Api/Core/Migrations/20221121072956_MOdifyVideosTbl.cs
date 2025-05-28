using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    public partial class MOdifyVideosTbl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SeoDescription",
                schema: "Media",
                table: "Videos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SeoTitle",
                schema: "Media",
                table: "Videos",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SeoDescription",
                schema: "Media",
                table: "Videos");

            migrationBuilder.DropColumn(
                name: "SeoTitle",
                schema: "Media",
                table: "Videos");
        }
    }
}
