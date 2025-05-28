using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    public partial class AddVideoProductAttachmentsTbl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "VideoProductAttachments",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    VideoTitle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VideoLink = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VideoProductAttachments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VideoProductAttachments_Products_ProductId",
                        column: x => x.ProductId,
                        principalSchema: "Catalog",
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "VideoFileProductAttachments",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    VideoProductAttachmentId = table.Column<int>(type: "int", nullable: false),
                    FileName = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: true),
                    FileExtension = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FileContentType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FileSize = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FileType = table.Column<int>(type: "int", nullable: false),
                    FilePath = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VideoFileProductAttachments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VideoFileProductAttachments_VideoProductAttachments_VideoProductAttachmentId",
                        column: x => x.VideoProductAttachmentId,
                        principalSchema: "Catalog",
                        principalTable: "VideoProductAttachments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_VideoFileProductAttachments_VideoProductAttachmentId",
                schema: "Catalog",
                table: "VideoFileProductAttachments",
                column: "VideoProductAttachmentId");

            migrationBuilder.CreateIndex(
                name: "IX_VideoProductAttachments_ProductId",
                schema: "Catalog",
                table: "VideoProductAttachments",
                column: "ProductId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VideoFileProductAttachments",
                schema: "Catalog");

            migrationBuilder.DropTable(
                name: "VideoProductAttachments",
                schema: "Catalog");
        }
    }
}
