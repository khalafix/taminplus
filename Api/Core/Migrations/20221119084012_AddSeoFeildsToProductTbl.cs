using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    public partial class AddSeoFeildsToProductTbl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SaleStatus",
                schema: "Catalog",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SeoDescription",
                schema: "Catalog",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SeoTitle",
                schema: "Catalog",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SaleStatus",
                schema: "Catalog",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "SeoDescription",
                schema: "Catalog",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "SeoTitle",
                schema: "Catalog",
                table: "Products");
        }
    }
}
