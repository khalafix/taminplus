using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    public partial class ModifyCustomersTable2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Customers_Cities_CityId",
                schema: "Security",
                table: "Customers");

            migrationBuilder.AlterColumn<int>(
                name: "CityId",
                schema: "Security",
                table: "Customers",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Customers_Cities_CityId",
                schema: "Security",
                table: "Customers",
                column: "CityId",
                principalSchema: "Base",
                principalTable: "Cities",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Customers_Cities_CityId",
                schema: "Security",
                table: "Customers");

            migrationBuilder.AlterColumn<int>(
                name: "CityId",
                schema: "Security",
                table: "Customers",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Customers_Cities_CityId",
                schema: "Security",
                table: "Customers",
                column: "CityId",
                principalSchema: "Base",
                principalTable: "Cities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
