using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    public partial class ModifyCustomersTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "City",
                schema: "Security",
                table: "Customers");

            migrationBuilder.AddColumn<Guid>(
                name: "CreateDate",
                schema: "Base",
                table: "NewsLetters",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<int>(
                name: "CityId",
                schema: "Security",
                table: "Customers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Customers_CityId",
                schema: "Security",
                table: "Customers",
                column: "CityId");

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Customers_Cities_CityId",
                schema: "Security",
                table: "Customers");

            migrationBuilder.DropIndex(
                name: "IX_Customers_CityId",
                schema: "Security",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "CreateDate",
                schema: "Base",
                table: "NewsLetters");

            migrationBuilder.DropColumn(
                name: "CityId",
                schema: "Security",
                table: "Customers");

            migrationBuilder.AddColumn<string>(
                name: "City",
                schema: "Security",
                table: "Customers",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
