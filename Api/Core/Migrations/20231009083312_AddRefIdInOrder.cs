using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    public partial class AddRefIdInOrder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CardHolderPan",
                schema: "Catalog",
                table: "Orders",
                type: "nvarchar(64)",
                maxLength: 64,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RefId",
                schema: "Catalog",
                table: "Orders",
                type: "nvarchar(64)",
                maxLength: 64,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SaleReferenceId",
                schema: "Catalog",
                table: "Orders",
                type: "nvarchar(64)",
                maxLength: 64,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CardHolderPan",
                schema: "Catalog",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "RefId",
                schema: "Catalog",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "SaleReferenceId",
                schema: "Catalog",
                table: "Orders");
        }
    }
}
