using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    public partial class ModifyProductsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsTopNew",
                schema: "Catalog",
                table: "Products",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsTopSale",
                schema: "Catalog",
                table: "Products",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsTopVisited",
                schema: "Catalog",
                table: "Products",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<double>(
                name: "SaleCount",
                schema: "Catalog",
                table: "Products",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "VisitedCount",
                schema: "Catalog",
                table: "Products",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsTopNew",
                schema: "Catalog",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "IsTopSale",
                schema: "Catalog",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "IsTopVisited",
                schema: "Catalog",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "SaleCount",
                schema: "Catalog",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "VisitedCount",
                schema: "Catalog",
                table: "Products");
        }
    }
}
