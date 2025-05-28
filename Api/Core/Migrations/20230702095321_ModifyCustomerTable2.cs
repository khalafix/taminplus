using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    public partial class ModifyCustomerTable2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DeliveryAddress",
                schema: "Security",
                table: "Customers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "GoldIranCityId",
                schema: "Security",
                table: "Customers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "GoldIranProvinceId",
                schema: "Security",
                table: "Customers",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeliveryAddress",
                schema: "Security",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "GoldIranCityId",
                schema: "Security",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "GoldIranProvinceId",
                schema: "Security",
                table: "Customers");
        }
    }
}
