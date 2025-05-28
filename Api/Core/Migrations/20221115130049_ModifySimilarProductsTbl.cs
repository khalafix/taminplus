using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    public partial class ModifySimilarProductsTbl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SimilarId",
                schema: "Catalog",
                table: "SimilarProducts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_SimilarProducts_SimilarId",
                schema: "Catalog",
                table: "SimilarProducts",
                column: "SimilarId");

            migrationBuilder.AddForeignKey(
                name: "FK_SimilarProducts_Products_SimilarId",
                schema: "Catalog",
                table: "SimilarProducts",
                column: "SimilarId",
                principalSchema: "Catalog",
                principalTable: "Products",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SimilarProducts_Products_SimilarId",
                schema: "Catalog",
                table: "SimilarProducts");

            migrationBuilder.DropIndex(
                name: "IX_SimilarProducts_SimilarId",
                schema: "Catalog",
                table: "SimilarProducts");

            migrationBuilder.DropColumn(
                name: "SimilarId",
                schema: "Catalog",
                table: "SimilarProducts");
        }
    }
}
