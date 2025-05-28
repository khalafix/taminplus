using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    public partial class AddAPIAmount : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "APIAmount",
                schema: "Catalog",
                table: "Products",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "APIQuantity",
                schema: "Catalog",
                table: "Products",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "APIAmount",
                schema: "Catalog",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "APIQuantity",
                schema: "Catalog",
                table: "Products");
        }
    }
}
