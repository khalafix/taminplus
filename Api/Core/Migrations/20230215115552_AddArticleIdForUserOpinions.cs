using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    public partial class AddArticleIdForUserOpinions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserOpinions_Products_ProductId",
                schema: "Support",
                table: "UserOpinions");

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                schema: "Support",
                table: "UserOpinions",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "ArticleId",
                schema: "Support",
                table: "UserOpinions",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserOpinions_ArticleId",
                schema: "Support",
                table: "UserOpinions",
                column: "ArticleId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserOpinions_Articles_ArticleId",
                schema: "Support",
                table: "UserOpinions",
                column: "ArticleId",
                principalSchema: "Blog",
                principalTable: "Articles",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserOpinions_Products_ProductId",
                schema: "Support",
                table: "UserOpinions",
                column: "ProductId",
                principalSchema: "Catalog",
                principalTable: "Products",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserOpinions_Articles_ArticleId",
                schema: "Support",
                table: "UserOpinions");

            migrationBuilder.DropForeignKey(
                name: "FK_UserOpinions_Products_ProductId",
                schema: "Support",
                table: "UserOpinions");

            migrationBuilder.DropIndex(
                name: "IX_UserOpinions_ArticleId",
                schema: "Support",
                table: "UserOpinions");

            migrationBuilder.DropColumn(
                name: "ArticleId",
                schema: "Support",
                table: "UserOpinions");

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                schema: "Support",
                table: "UserOpinions",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_UserOpinions_Products_ProductId",
                schema: "Support",
                table: "UserOpinions",
                column: "ProductId",
                principalSchema: "Catalog",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
