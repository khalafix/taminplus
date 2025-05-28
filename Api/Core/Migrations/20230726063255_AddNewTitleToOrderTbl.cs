using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    public partial class AddNewTitleToOrderTbl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CityTitle",
                schema: "Catalog",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ParishTitle",
                schema: "Catalog",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProvinceTitle",
                schema: "Catalog",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RegionTitle",
                schema: "Catalog",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CityTitle",
                schema: "Catalog",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "ParishTitle",
                schema: "Catalog",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "ProvinceTitle",
                schema: "Catalog",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "RegionTitle",
                schema: "Catalog",
                table: "Orders");
        }
    }
}
