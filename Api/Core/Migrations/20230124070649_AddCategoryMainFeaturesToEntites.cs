using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    public partial class AddCategoryMainFeaturesToEntites : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CategoryMainFeatures",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    FeatureId = table.Column<int>(type: "int", nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryMainFeatures", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CategoryMainFeatures_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalSchema: "Catalog",
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CategoryMainFeatures_Features_FeatureId",
                        column: x => x.FeatureId,
                        principalSchema: "Catalog",
                        principalTable: "Features",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CategoryMainFeatures_CategoryId",
                schema: "Catalog",
                table: "CategoryMainFeatures",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_CategoryMainFeatures_FeatureId",
                schema: "Catalog",
                table: "CategoryMainFeatures",
                column: "FeatureId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CategoryMainFeatures",
                schema: "Catalog");
        }
    }
}
