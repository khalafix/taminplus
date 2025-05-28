using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    public partial class AddOrderLogsToEntites : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DeliveredDate",
                schema: "Catalog",
                table: "Orders",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "InProgressDate",
                schema: "Catalog",
                table: "Orders",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OrderStatusRemark",
                schema: "Catalog",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "RejectDate",
                schema: "Catalog",
                table: "Orders",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "SendingDate",
                schema: "Catalog",
                table: "Orders",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "SentDate",
                schema: "Catalog",
                table: "Orders",
                type: "datetime2",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "OrderLogs",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrderId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrderStatus = table.Column<int>(type: "int", nullable: false),
                    OrderStatusRemark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderLogs_Orders_OrderId",
                        column: x => x.OrderId,
                        principalSchema: "Catalog",
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderLogs_OrderId",
                schema: "Catalog",
                table: "OrderLogs",
                column: "OrderId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderLogs",
                schema: "Catalog");

            migrationBuilder.DropColumn(
                name: "DeliveredDate",
                schema: "Catalog",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "InProgressDate",
                schema: "Catalog",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "OrderStatusRemark",
                schema: "Catalog",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "RejectDate",
                schema: "Catalog",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "SendingDate",
                schema: "Catalog",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "SentDate",
                schema: "Catalog",
                table: "Orders");
        }
    }
}
