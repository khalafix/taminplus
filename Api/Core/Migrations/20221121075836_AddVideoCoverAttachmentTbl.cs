using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    public partial class AddVideoCoverAttachmentTbl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "VideoCoverAttachments",
                schema: "Media",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    VideoId = table.Column<int>(type: "int", nullable: false),
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
                    table.PrimaryKey("PK_VideoCoverAttachments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VideoCoverAttachments_Videos_VideoId",
                        column: x => x.VideoId,
                        principalSchema: "Media",
                        principalTable: "Videos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_VideoCoverAttachments_VideoId",
                schema: "Media",
                table: "VideoCoverAttachments",
                column: "VideoId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VideoCoverAttachments",
                schema: "Media");
        }
    }
}
