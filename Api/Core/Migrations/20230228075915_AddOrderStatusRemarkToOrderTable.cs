using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    public partial class AddOrderStatusRemarkToOrderTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "OrderReturnByCustomerDate",
                schema: "Catalog",
                table: "Orders",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OrderReturnByCustomerRemark",
                schema: "Catalog",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrderReturnByCustomerDate",
                schema: "Catalog",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "OrderReturnByCustomerRemark",
                schema: "Catalog",
                table: "Orders");
        }
    }
}
