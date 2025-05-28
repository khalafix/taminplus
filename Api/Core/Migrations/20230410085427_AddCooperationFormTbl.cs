using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    public partial class AddCooperationFormTbl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ContactForms",
                schema: "Support",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Subject = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactForms", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CooperationForms",
                schema: "Support",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Education = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    JobOpportunityId = table.Column<int>(type: "int", nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CooperationForms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CooperationForms_JobOpportunities_JobOpportunityId",
                        column: x => x.JobOpportunityId,
                        principalSchema: "Base",
                        principalTable: "JobOpportunities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ContactFormAttachments",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FileName = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: true),
                    FileExtension = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FileContentType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FileSize = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FileType = table.Column<int>(type: "int", nullable: false),
                    FilePath = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ContactFormId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactFormAttachments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ContactFormAttachments_ContactForms_ContactFormId",
                        column: x => x.ContactFormId,
                        principalSchema: "Support",
                        principalTable: "ContactForms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CooperationFormAttachments",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FileName = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: true),
                    FileExtension = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FileContentType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FileSize = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FileType = table.Column<int>(type: "int", nullable: false),
                    FilePath = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CooperationFormId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CooperationFormAttachments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CooperationFormAttachments_CooperationForms_CooperationFormId",
                        column: x => x.CooperationFormId,
                        principalSchema: "Support",
                        principalTable: "CooperationForms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ContactFormAttachments_ContactFormId",
                schema: "Catalog",
                table: "ContactFormAttachments",
                column: "ContactFormId");

            migrationBuilder.CreateIndex(
                name: "IX_CooperationFormAttachments_CooperationFormId",
                schema: "Catalog",
                table: "CooperationFormAttachments",
                column: "CooperationFormId");

            migrationBuilder.CreateIndex(
                name: "IX_CooperationForms_JobOpportunityId",
                schema: "Support",
                table: "CooperationForms",
                column: "JobOpportunityId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ContactFormAttachments",
                schema: "Catalog");

            migrationBuilder.DropTable(
                name: "CooperationFormAttachments",
                schema: "Catalog");

            migrationBuilder.DropTable(
                name: "ContactForms",
                schema: "Support");

            migrationBuilder.DropTable(
                name: "CooperationForms",
                schema: "Support");
        }
    }
}
