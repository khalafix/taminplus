using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    public partial class AddNewTitleToCustomerTbl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CityTitle",
                schema: "Security",
                table: "Customers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ParishTitle",
                schema: "Security",
                table: "Customers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProvinceTitle",
                schema: "Security",
                table: "Customers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RegionTitle",
                schema: "Security",
                table: "Customers",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CityTitle",
                schema: "Security",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "ParishTitle",
                schema: "Security",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "ProvinceTitle",
                schema: "Security",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "RegionTitle",
                schema: "Security",
                table: "Customers");
        }
    }
}
