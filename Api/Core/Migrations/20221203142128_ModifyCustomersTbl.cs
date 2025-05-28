using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    public partial class ModifyCustomersTbl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                schema: "Security",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "FirstName",
                schema: "Security",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "FullName",
                schema: "Security",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "LastName",
                schema: "Security",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                schema: "Security",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "Sex",
                schema: "Security",
                table: "Customers");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                schema: "Security",
                table: "Customers",
                type: "nvarchar(64)",
                maxLength: 64,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                schema: "Security",
                table: "Customers",
                type: "nvarchar(64)",
                maxLength: 64,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FullName",
                schema: "Security",
                table: "Customers",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                schema: "Security",
                table: "Customers",
                type: "nvarchar(64)",
                maxLength: 64,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                schema: "Security",
                table: "Customers",
                type: "nvarchar(32)",
                maxLength: 32,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Sex",
                schema: "Security",
                table: "Customers",
                type: "int",
                nullable: true);
        }
    }
}
