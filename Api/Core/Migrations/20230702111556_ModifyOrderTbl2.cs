using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    public partial class ModifyOrderTbl2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CityId",
                schema: "Catalog",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeliveryAddress",
                schema: "Catalog",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ParishId",
                schema: "Catalog",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProvinceId",
                schema: "Catalog",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RegionId",
                schema: "Catalog",
                table: "Orders",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CityId",
                schema: "Catalog",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "DeliveryAddress",
                schema: "Catalog",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "ParishId",
                schema: "Catalog",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "ProvinceId",
                schema: "Catalog",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "RegionId",
                schema: "Catalog",
                table: "Orders");
        }
    }
}
