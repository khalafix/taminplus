using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    public partial class ModifySchemaForCooperationFormTbl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable(
                name: "CooperationFormAttachments",
                schema: "Catalog",
                newName: "CooperationFormAttachments",
                newSchema: "Support");

            migrationBuilder.RenameTable(
                name: "ContactFormAttachments",
                schema: "Catalog",
                newName: "ContactFormAttachments",
                newSchema: "Support");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable(
                name: "CooperationFormAttachments",
                schema: "Support",
                newName: "CooperationFormAttachments",
                newSchema: "Catalog");

            migrationBuilder.RenameTable(
                name: "ContactFormAttachments",
                schema: "Support",
                newName: "ContactFormAttachments",
                newSchema: "Catalog");
        }
    }
}
