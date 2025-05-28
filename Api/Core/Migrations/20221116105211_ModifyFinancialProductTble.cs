using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    public partial class ModifyFinancialProductTble : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ToRegisterDate",
                schema: "Catalog",
                table: "FinancialProducts",
                newName: "ToDate");

            migrationBuilder.RenameColumn(
                name: "FromRegisterDate",
                schema: "Catalog",
                table: "FinancialProducts",
                newName: "FromDate");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ToDate",
                schema: "Catalog",
                table: "FinancialProducts",
                newName: "ToRegisterDate");

            migrationBuilder.RenameColumn(
                name: "FromDate",
                schema: "Catalog",
                table: "FinancialProducts",
                newName: "FromRegisterDate");
        }
    }
}
