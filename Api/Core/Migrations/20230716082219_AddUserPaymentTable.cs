using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    public partial class AddUserPaymentTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "Payment");

            migrationBuilder.CreateTable(
                name: "UserPayments",
                schema: "Payment",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Amount = table.Column<long>(type: "bigint", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrderValue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OrderDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PaymentResult = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BankConfirmResult = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TrackingCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsSuccess = table.Column<bool>(type: "bit", nullable: true),
                    OrderId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPayments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserPayments_Orders_OrderId",
                        column: x => x.OrderId,
                        principalSchema: "Catalog",
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserPayments_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "Security",
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserPayments_OrderId",
                schema: "Payment",
                table: "UserPayments",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_UserPayments_UserId",
                schema: "Payment",
                table: "UserPayments",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserPayments",
                schema: "Payment");
        }
    }
}
