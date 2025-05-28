using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    public partial class AddUserLastTryLoginDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "LastLoginDate",
                schema: "Security",
                table: "Users",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastTryLoginDate",
                schema: "Security",
                table: "Users",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LoginfailedDate",
                schema: "Security",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastLoginDate",
                schema: "Security",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "LastTryLoginDate",
                schema: "Security",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "LoginfailedDate",
                schema: "Security",
                table: "Users");
        }
    }
}
