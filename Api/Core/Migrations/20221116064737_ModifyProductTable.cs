using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    public partial class ModifyProductTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "GetInventoryFromApi",
                schema: "Catalog",
                table: "Products",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "Inventory",
                schema: "Catalog",
                table: "Products",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GetInventoryFromApi",
                schema: "Catalog",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Inventory",
                schema: "Catalog",
                table: "Products");
        }
    }
}
