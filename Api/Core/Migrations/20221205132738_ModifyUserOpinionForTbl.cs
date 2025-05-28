using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    public partial class ModifyUserOpinionForTbl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UseOpinions",
                schema: "Support");

            migrationBuilder.CreateTable(
                name: "UserOpinions",
                schema: "Support",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SenderUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(512)", maxLength: 512, nullable: false),
                    ShowStatus = table.Column<int>(type: "int", nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Score = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserOpinions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserOpinions_Products_ProductId",
                        column: x => x.ProductId,
                        principalSchema: "Catalog",
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserOpinions_Users_SenderUserId",
                        column: x => x.SenderUserId,
                        principalSchema: "Security",
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UserOpinionDetails",
                schema: "Support",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserOpinionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UseOpinionStatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserOpinionDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserOpinionDetails_UserOpinions_UserOpinionId",
                        column: x => x.UserOpinionId,
                        principalSchema: "Support",
                        principalTable: "UserOpinions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserOpinionDetails_UserOpinionId",
                schema: "Support",
                table: "UserOpinionDetails",
                column: "UserOpinionId");

            migrationBuilder.CreateIndex(
                name: "IX_UserOpinions_ProductId",
                schema: "Support",
                table: "UserOpinions",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_UserOpinions_SenderUserId",
                schema: "Support",
                table: "UserOpinions",
                column: "SenderUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserOpinionDetails",
                schema: "Support");

            migrationBuilder.DropTable(
                name: "UserOpinions",
                schema: "Support");

            migrationBuilder.CreateTable(
                name: "UseOpinions",
                schema: "Support",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    SenderUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(512)", maxLength: 512, nullable: false),
                    ShowStatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UseOpinions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UseOpinions_Products_ProductId",
                        column: x => x.ProductId,
                        principalSchema: "Catalog",
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UseOpinions_Users_SenderUserId",
                        column: x => x.SenderUserId,
                        principalSchema: "Security",
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_UseOpinions_ProductId",
                schema: "Support",
                table: "UseOpinions",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_UseOpinions_SenderUserId",
                schema: "Support",
                table: "UseOpinions",
                column: "SenderUserId");
        }
    }
}
