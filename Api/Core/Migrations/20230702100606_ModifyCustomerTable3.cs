using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    public partial class ModifyCustomerTable3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ParishId",
                schema: "Security",
                table: "Customers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RegionId",
                schema: "Security",
                table: "Customers",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ParishId",
                schema: "Security",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "RegionId",
                schema: "Security",
                table: "Customers");
        }
    }
}
