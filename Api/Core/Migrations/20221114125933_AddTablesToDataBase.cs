using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    public partial class AddTablesToDataBase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "Base");

            migrationBuilder.EnsureSchema(
                name: "Blog");

            migrationBuilder.EnsureSchema(
                name: "Catalog");

            migrationBuilder.EnsureSchema(
                name: "Support");

            migrationBuilder.EnsureSchema(
                name: "Security");

            migrationBuilder.EnsureSchema(
                name: "Media");

            migrationBuilder.CreateTable(
                name: "ApplicationConfigs",
                schema: "Base",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ApplicationTitle = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ApplicationTitleEn = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    MainLogo = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    MainLogoEn = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    SidebarLogo = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    SidebarLogoEn = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    ShowFooterEn = table.Column<bool>(type: "bit", nullable: true),
                    ShowFooter = table.Column<bool>(type: "bit", nullable: false),
                    Footer = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    FooterEn = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationConfigs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ArticleCategories",
                schema: "Blog",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArticleCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Brands",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Brands", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Cartables",
                schema: "Security",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    EnTitle = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Url = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    CartableType = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cartables", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Categories",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryName = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    Code = table.Column<string>(type: "nvarchar(16)", maxLength: 16, nullable: true),
                    ParentId = table.Column<int>(type: "int", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Categories_Categories_ParentId",
                        column: x => x.ParentId,
                        principalSchema: "Catalog",
                        principalTable: "Categories",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Currencies",
                schema: "Base",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    Symbol = table.Column<string>(type: "nvarchar(8)", maxLength: 8, nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Currencies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DeliveryLocations",
                schema: "Base",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(512)", maxLength: 512, nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeliveryLocations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FeatureCategories",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FeatureCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Menus",
                schema: "Security",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Icon = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Path = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ParentId = table.Column<int>(type: "int", nullable: true),
                    SortOrder = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    Tag = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Menus", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Origins",
                schema: "Base",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Origins", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PermissionGroups",
                schema: "Security",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    EnTitle = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: true),
                    Icon = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    ShowInMenu = table.Column<bool>(type: "bit", nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PermissionGroups", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                schema: "Security",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleName = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    Title = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Code = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: true),
                    HomaCode = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: true),
                    ParentId = table.Column<int>(type: "int", nullable: true),
                    OrganizationLevel = table.Column<int>(type: "int", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Roles_Roles_ParentId",
                        column: x => x.ParentId,
                        principalSchema: "Security",
                        principalTable: "Roles",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Symbols",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    ParentId = table.Column<int>(type: "int", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Symbols", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserGroups",
                schema: "Security",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserGroups", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                schema: "Security",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    IsCompany = table.Column<bool>(type: "bit", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: true),
                    Code = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: true),
                    Sex = table.Column<int>(type: "int", nullable: true),
                    UserType = table.Column<int>(type: "int", nullable: true),
                    ConfirmationCode = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ConfirmationDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    EmailSignature = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "VideoCategories",
                schema: "Media",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: true),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VideoCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Articles",
                schema: "Blog",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    ShortDescription = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ArticleCategoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Articles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Articles_ArticleCategories_ArticleCategoryId",
                        column: x => x.ArticleCategoryId,
                        principalSchema: "Blog",
                        principalTable: "ArticleCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BrandAttachments",
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
                    BrandId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BrandAttachments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BrandAttachments_Brands_BrandId",
                        column: x => x.BrandId,
                        principalSchema: "Catalog",
                        principalTable: "Brands",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductName = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    Code = table.Column<string>(type: "nvarchar(16)", maxLength: 16, nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    BrandId = table.Column<int>(type: "int", nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Products_Brands_BrandId",
                        column: x => x.BrandId,
                        principalSchema: "Catalog",
                        principalTable: "Brands",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Products_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalSchema: "Catalog",
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Permissions",
                schema: "Security",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    EnTitle = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: true),
                    Url = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: true),
                    ShowInSidebar = table.Column<bool>(type: "bit", nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: true),
                    Icon = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    IsTopLevel = table.Column<bool>(type: "bit", nullable: true),
                    PermissionGroupId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permissions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Permissions_PermissionGroups_PermissionGroupId",
                        column: x => x.PermissionGroupId,
                        principalSchema: "Security",
                        principalTable: "PermissionGroups",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "MenuRoles",
                schema: "Security",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MenuId = table.Column<int>(type: "int", nullable: false),
                    RoleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MenuRoles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MenuRoles_Menus_MenuId",
                        column: x => x.MenuId,
                        principalSchema: "Security",
                        principalTable: "Menus",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MenuRoles_Roles_RoleId",
                        column: x => x.RoleId,
                        principalSchema: "Security",
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Features",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    UnitType = table.Column<int>(type: "int", nullable: false),
                    ControlType = table.Column<int>(type: "int", nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FeatureCategoryId = table.Column<int>(type: "int", nullable: true),
                    Max = table.Column<int>(type: "int", nullable: true),
                    Min = table.Column<int>(type: "int", nullable: true),
                    Option = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SymbolId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Features", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Features_FeatureCategories_FeatureCategoryId",
                        column: x => x.FeatureCategoryId,
                        principalSchema: "Catalog",
                        principalTable: "FeatureCategories",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Features_Symbols_SymbolId",
                        column: x => x.SymbolId,
                        principalSchema: "Catalog",
                        principalTable: "Symbols",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UserGroupActions",
                schema: "Security",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyRequestWorkFlowStatus = table.Column<int>(type: "int", nullable: false),
                    UserGroupId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserGroupActions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserGroupActions_UserGroups_UserGroupId",
                        column: x => x.UserGroupId,
                        principalSchema: "Security",
                        principalTable: "UserGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CartableRecords",
                schema: "Support",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    CartableType = table.Column<int>(type: "int", nullable: true),
                    CartableId = table.Column<int>(type: "int", nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SenderUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Url = table.Column<string>(type: "nvarchar(512)", maxLength: 512, nullable: true),
                    RecordId = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: true),
                    Visited = table.Column<bool>(type: "bit", nullable: false),
                    VisitedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CartableRecords", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CartableRecords_Cartables_CartableId",
                        column: x => x.CartableId,
                        principalSchema: "Security",
                        principalTable: "Cartables",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CartableRecords_Users_SenderUserId",
                        column: x => x.SenderUserId,
                        principalSchema: "Security",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CompanyQuestions",
                schema: "Support",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Body = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CompanyQuestionStatus = table.Column<int>(type: "int", nullable: false),
                    AttachmentFile = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreateUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyQuestions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompanyQuestions_Users_CreateUserId",
                        column: x => x.CreateUserId,
                        principalSchema: "Security",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InternalMessages",
                schema: "Support",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Subject = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Body = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ActionLink = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    SendDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    InternalMessageType = table.Column<int>(type: "int", nullable: false),
                    SendEmail = table.Column<bool>(type: "bit", nullable: false),
                    VisitedEmailDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    VisitedFromAppDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ReciverRoleId = table.Column<int>(type: "int", nullable: true),
                    ReciverUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    SenderUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SenderUserRoleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InternalMessages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InternalMessages_Roles_ReciverRoleId",
                        column: x => x.ReciverRoleId,
                        principalSchema: "Security",
                        principalTable: "Roles",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_InternalMessages_Roles_SenderUserRoleId",
                        column: x => x.SenderUserRoleId,
                        principalSchema: "Security",
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InternalMessages_Users_ReciverUserId",
                        column: x => x.ReciverUserId,
                        principalSchema: "Security",
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_InternalMessages_Users_SenderUserId",
                        column: x => x.SenderUserId,
                        principalSchema: "Security",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Projects",
                schema: "Base",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    ProjectTitle = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    Code = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(512)", maxLength: 512, nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    OrganizationUnitId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Projects_Roles_OrganizationUnitId",
                        column: x => x.OrganizationUnitId,
                        principalSchema: "Security",
                        principalTable: "Roles",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Projects_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "Security",
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UserCartables",
                schema: "Security",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CartableId = table.Column<int>(type: "int", nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RegisterUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserCartables", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserCartables_Cartables_CartableId",
                        column: x => x.CartableId,
                        principalSchema: "Security",
                        principalTable: "Cartables",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserCartables_Users_RegisterUserId",
                        column: x => x.RegisterUserId,
                        principalSchema: "Security",
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UserCartables_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "Security",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserDisciplines",
                schema: "Security",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DisciplineId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserDisciplines", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserDisciplines_Roles_DisciplineId",
                        column: x => x.DisciplineId,
                        principalSchema: "Security",
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserDisciplines_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "Security",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserGroupMembers",
                schema: "Security",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserGroupId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserGroupMembers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserGroupMembers_UserGroups_UserGroupId",
                        column: x => x.UserGroupId,
                        principalSchema: "Security",
                        principalTable: "UserGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserGroupMembers_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "Security",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserMessages",
                schema: "Support",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Subject = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Body = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ActionLink = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    To = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: true),
                    CC = table.Column<string>(type: "nvarchar(512)", maxLength: 512, nullable: true),
                    SendDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserMessageType = table.Column<int>(type: "int", nullable: false),
                    SendEmail = table.Column<bool>(type: "bit", nullable: false),
                    Visited = table.Column<bool>(type: "bit", nullable: true),
                    VisitedEmailDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    VisitedFromAppDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    SendWithSystem = table.Column<bool>(type: "bit", nullable: false),
                    SenderUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ReceiverUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    SenderUserRoleId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserMessages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserMessages_Roles_SenderUserRoleId",
                        column: x => x.SenderUserRoleId,
                        principalSchema: "Security",
                        principalTable: "Roles",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UserMessages_Users_ReceiverUserId",
                        column: x => x.ReceiverUserId,
                        principalSchema: "Security",
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UserMessages_Users_SenderUserId",
                        column: x => x.SenderUserId,
                        principalSchema: "Security",
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UserOrganizationUnits",
                schema: "Security",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrganizationUnitId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserOrganizationUnits", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserOrganizationUnits_Roles_OrganizationUnitId",
                        column: x => x.OrganizationUnitId,
                        principalSchema: "Security",
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserOrganizationUnits_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "Security",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserRefreshTokenHistories",
                schema: "Security",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsValid = table.Column<bool>(type: "bit", nullable: false),
                    RefreshToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserIP = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserBrowser = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRefreshTokenHistories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserRefreshTokenHistories_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "Security",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserRefreshTokens",
                schema: "Security",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsValid = table.Column<bool>(type: "bit", nullable: false),
                    RefreshToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserIP = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserBrowser = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRefreshTokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserRefreshTokens_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "Security",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserResetPasswords",
                schema: "Security",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ResetToken = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsUsed = table.Column<bool>(type: "bit", nullable: false),
                    UsedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserResetPasswords", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserResetPasswords_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "Security",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserRole",
                schema: "Security",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RoleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRole", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserRole_Roles_RoleId",
                        column: x => x.RoleId,
                        principalSchema: "Security",
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserRole_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "Security",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Videos",
                schema: "Media",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(512)", maxLength: 512, nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: true),
                    VideoLink = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VideoSource = table.Column<int>(type: "int", nullable: false),
                    VideoCategoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Videos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Videos_VideoCategories_VideoCategoryId",
                        column: x => x.VideoCategoryId,
                        principalSchema: "Media",
                        principalTable: "VideoCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ArticleAttachments",
                schema: "Blog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ArticleId = table.Column<int>(type: "int", nullable: false),
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
                    table.PrimaryKey("PK_ArticleAttachments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ArticleAttachments_Articles_ArticleId",
                        column: x => x.ArticleId,
                        principalSchema: "Blog",
                        principalTable: "Articles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductAttachment",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    ProductAttachmentType = table.Column<int>(type: "int", nullable: false),
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
                    table.PrimaryKey("PK_ProductAttachment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductAttachment_Products_ProductId",
                        column: x => x.ProductId,
                        principalSchema: "Catalog",
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductUsages",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductUsages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductUsages_Products_ProductId",
                        column: x => x.ProductId,
                        principalSchema: "Catalog",
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductUserComments",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Comment = table.Column<string>(type: "nvarchar(1024)", maxLength: 1024, nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ShowInSite = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductUserComments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductUserComments_Products_ProductId",
                        column: x => x.ProductId,
                        principalSchema: "Catalog",
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductUserComments_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "Security",
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "VideoProductAttachments",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
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
                name: "RolePermissions",
                schema: "Security",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PermissionId = table.Column<int>(type: "int", nullable: false),
                    RoleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RolePermissions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RolePermissions_Permissions_PermissionId",
                        column: x => x.PermissionId,
                        principalSchema: "Security",
                        principalTable: "Permissions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RolePermissions_Roles_RoleId",
                        column: x => x.RoleId,
                        principalSchema: "Security",
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CategoryFeatures",
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
                    table.PrimaryKey("PK_CategoryFeatures", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CategoryFeatures_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalSchema: "Catalog",
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CategoryFeatures_Features_FeatureId",
                        column: x => x.FeatureId,
                        principalSchema: "Catalog",
                        principalTable: "Features",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserAnswers",
                schema: "Support",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Body = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SenderUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserQuestionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AttachmentFile = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAnswers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserAnswers_CompanyQuestions_UserQuestionId",
                        column: x => x.UserQuestionId,
                        principalSchema: "Support",
                        principalTable: "CompanyQuestions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserAnswers_Users_SenderUserId",
                        column: x => x.SenderUserId,
                        principalSchema: "Security",
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EmailTemplates",
                schema: "Base",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Template = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DefaultTemplate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    EmailCC = table.Column<string>(type: "nvarchar(1024)", maxLength: 1024, nullable: true),
                    EmailTemplateType = table.Column<int>(type: "int", nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RegisterUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProjectId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmailTemplates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmailTemplates_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalSchema: "Base",
                        principalTable: "Projects",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmailTemplates_Users_RegisterUserId",
                        column: x => x.RegisterUserId,
                        principalSchema: "Security",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserProjects",
                schema: "Security",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProjectId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProjects", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserProjects_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalSchema: "Base",
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserProjects_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "Security",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "VideoAttachments",
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
                    table.PrimaryKey("PK_VideoAttachments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VideoAttachments_Videos_VideoId",
                        column: x => x.VideoId,
                        principalSchema: "Media",
                        principalTable: "Videos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductFeatureValues",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    ProductCategoryFeatureId = table.Column<int>(type: "int", nullable: false),
                    FeatureValue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FeatureValueNumber = table.Column<int>(type: "int", nullable: true),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductFeatureValues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductFeatureValues_CategoryFeatures_ProductCategoryFeatureId",
                        column: x => x.ProductCategoryFeatureId,
                        principalSchema: "Catalog",
                        principalTable: "CategoryFeatures",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ProductFeatureValues_Products_ProductId",
                        column: x => x.ProductId,
                        principalSchema: "Catalog",
                        principalTable: "Products",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ProductFeatureValues_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "Security",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ArticleAttachments_ArticleId",
                schema: "Blog",
                table: "ArticleAttachments",
                column: "ArticleId");

            migrationBuilder.CreateIndex(
                name: "IX_Articles_ArticleCategoryId",
                schema: "Blog",
                table: "Articles",
                column: "ArticleCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_BrandAttachments_BrandId",
                schema: "Catalog",
                table: "BrandAttachments",
                column: "BrandId");

            migrationBuilder.CreateIndex(
                name: "IX_CartableRecords_CartableId",
                schema: "Support",
                table: "CartableRecords",
                column: "CartableId");

            migrationBuilder.CreateIndex(
                name: "IX_CartableRecords_SenderUserId",
                schema: "Support",
                table: "CartableRecords",
                column: "SenderUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Categories_ParentId",
                schema: "Catalog",
                table: "Categories",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_CategoryFeatures_CategoryId",
                schema: "Catalog",
                table: "CategoryFeatures",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_CategoryFeatures_FeatureId",
                schema: "Catalog",
                table: "CategoryFeatures",
                column: "FeatureId");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyQuestions_CreateUserId",
                schema: "Support",
                table: "CompanyQuestions",
                column: "CreateUserId");

            migrationBuilder.CreateIndex(
                name: "IX_EmailTemplates_ProjectId",
                schema: "Base",
                table: "EmailTemplates",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_EmailTemplates_RegisterUserId",
                schema: "Base",
                table: "EmailTemplates",
                column: "RegisterUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Features_FeatureCategoryId",
                schema: "Catalog",
                table: "Features",
                column: "FeatureCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Features_SymbolId",
                schema: "Catalog",
                table: "Features",
                column: "SymbolId");

            migrationBuilder.CreateIndex(
                name: "IX_InternalMessages_ReciverRoleId",
                schema: "Support",
                table: "InternalMessages",
                column: "ReciverRoleId");

            migrationBuilder.CreateIndex(
                name: "IX_InternalMessages_ReciverUserId",
                schema: "Support",
                table: "InternalMessages",
                column: "ReciverUserId");

            migrationBuilder.CreateIndex(
                name: "IX_InternalMessages_SenderUserId",
                schema: "Support",
                table: "InternalMessages",
                column: "SenderUserId");

            migrationBuilder.CreateIndex(
                name: "IX_InternalMessages_SenderUserRoleId",
                schema: "Support",
                table: "InternalMessages",
                column: "SenderUserRoleId");

            migrationBuilder.CreateIndex(
                name: "IX_MenuRoles_MenuId",
                schema: "Security",
                table: "MenuRoles",
                column: "MenuId");

            migrationBuilder.CreateIndex(
                name: "IX_MenuRoles_RoleId",
                schema: "Security",
                table: "MenuRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_Permissions_PermissionGroupId",
                schema: "Security",
                table: "Permissions",
                column: "PermissionGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductAttachment_ProductId",
                schema: "Catalog",
                table: "ProductAttachment",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductFeatureValues_ProductCategoryFeatureId",
                schema: "Catalog",
                table: "ProductFeatureValues",
                column: "ProductCategoryFeatureId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductFeatureValues_ProductId",
                schema: "Catalog",
                table: "ProductFeatureValues",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductFeatureValues_UserId",
                schema: "Catalog",
                table: "ProductFeatureValues",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_BrandId",
                schema: "Catalog",
                table: "Products",
                column: "BrandId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_CategoryId",
                schema: "Catalog",
                table: "Products",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductUsages_ProductId",
                schema: "Catalog",
                table: "ProductUsages",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductUserComments_ProductId",
                schema: "Catalog",
                table: "ProductUserComments",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductUserComments_UserId",
                schema: "Catalog",
                table: "ProductUserComments",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_OrganizationUnitId",
                schema: "Base",
                table: "Projects",
                column: "OrganizationUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_UserId",
                schema: "Base",
                table: "Projects",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_RolePermissions_PermissionId",
                schema: "Security",
                table: "RolePermissions",
                column: "PermissionId");

            migrationBuilder.CreateIndex(
                name: "IX_RolePermissions_RoleId",
                schema: "Security",
                table: "RolePermissions",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_Roles_ParentId",
                schema: "Security",
                table: "Roles",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_UserAnswers_SenderUserId",
                schema: "Support",
                table: "UserAnswers",
                column: "SenderUserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserAnswers_UserQuestionId",
                schema: "Support",
                table: "UserAnswers",
                column: "UserQuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_UserCartables_CartableId",
                schema: "Security",
                table: "UserCartables",
                column: "CartableId");

            migrationBuilder.CreateIndex(
                name: "IX_UserCartables_RegisterUserId",
                schema: "Security",
                table: "UserCartables",
                column: "RegisterUserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserCartables_UserId",
                schema: "Security",
                table: "UserCartables",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserDisciplines_DisciplineId",
                schema: "Security",
                table: "UserDisciplines",
                column: "DisciplineId");

            migrationBuilder.CreateIndex(
                name: "IX_UserDisciplines_UserId",
                schema: "Security",
                table: "UserDisciplines",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserGroupActions_UserGroupId",
                schema: "Security",
                table: "UserGroupActions",
                column: "UserGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_UserGroupMembers_UserGroupId",
                schema: "Security",
                table: "UserGroupMembers",
                column: "UserGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_UserGroupMembers_UserId",
                schema: "Security",
                table: "UserGroupMembers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserMessages_ReceiverUserId",
                schema: "Support",
                table: "UserMessages",
                column: "ReceiverUserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserMessages_SenderUserId",
                schema: "Support",
                table: "UserMessages",
                column: "SenderUserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserMessages_SenderUserRoleId",
                schema: "Support",
                table: "UserMessages",
                column: "SenderUserRoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UserOrganizationUnits_OrganizationUnitId",
                schema: "Security",
                table: "UserOrganizationUnits",
                column: "OrganizationUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_UserOrganizationUnits_UserId",
                schema: "Security",
                table: "UserOrganizationUnits",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserProjects_ProjectId",
                schema: "Security",
                table: "UserProjects",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_UserProjects_UserId",
                schema: "Security",
                table: "UserProjects",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRefreshTokenHistories_UserId",
                schema: "Security",
                table: "UserRefreshTokenHistories",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRefreshTokens_UserId",
                schema: "Security",
                table: "UserRefreshTokens",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserResetPasswords_UserId",
                schema: "Security",
                table: "UserResetPasswords",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRole_RoleId",
                schema: "Security",
                table: "UserRole",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRole_UserId",
                schema: "Security",
                table: "UserRole",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_VideoAttachments_VideoId",
                schema: "Media",
                table: "VideoAttachments",
                column: "VideoId");

            migrationBuilder.CreateIndex(
                name: "IX_VideoProductAttachments_ProductId",
                schema: "Catalog",
                table: "VideoProductAttachments",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Videos_VideoCategoryId",
                schema: "Media",
                table: "Videos",
                column: "VideoCategoryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApplicationConfigs",
                schema: "Base");

            migrationBuilder.DropTable(
                name: "ArticleAttachments",
                schema: "Blog");

            migrationBuilder.DropTable(
                name: "BrandAttachments",
                schema: "Catalog");

            migrationBuilder.DropTable(
                name: "CartableRecords",
                schema: "Support");

            migrationBuilder.DropTable(
                name: "Currencies",
                schema: "Base");

            migrationBuilder.DropTable(
                name: "DeliveryLocations",
                schema: "Base");

            migrationBuilder.DropTable(
                name: "EmailTemplates",
                schema: "Base");

            migrationBuilder.DropTable(
                name: "InternalMessages",
                schema: "Support");

            migrationBuilder.DropTable(
                name: "MenuRoles",
                schema: "Security");

            migrationBuilder.DropTable(
                name: "Origins",
                schema: "Base");

            migrationBuilder.DropTable(
                name: "ProductAttachment",
                schema: "Catalog");

            migrationBuilder.DropTable(
                name: "ProductFeatureValues",
                schema: "Catalog");

            migrationBuilder.DropTable(
                name: "ProductUsages",
                schema: "Catalog");

            migrationBuilder.DropTable(
                name: "ProductUserComments",
                schema: "Catalog");

            migrationBuilder.DropTable(
                name: "RolePermissions",
                schema: "Security");

            migrationBuilder.DropTable(
                name: "UserAnswers",
                schema: "Support");

            migrationBuilder.DropTable(
                name: "UserCartables",
                schema: "Security");

            migrationBuilder.DropTable(
                name: "UserDisciplines",
                schema: "Security");

            migrationBuilder.DropTable(
                name: "UserGroupActions",
                schema: "Security");

            migrationBuilder.DropTable(
                name: "UserGroupMembers",
                schema: "Security");

            migrationBuilder.DropTable(
                name: "UserMessages",
                schema: "Support");

            migrationBuilder.DropTable(
                name: "UserOrganizationUnits",
                schema: "Security");

            migrationBuilder.DropTable(
                name: "UserProjects",
                schema: "Security");

            migrationBuilder.DropTable(
                name: "UserRefreshTokenHistories",
                schema: "Security");

            migrationBuilder.DropTable(
                name: "UserRefreshTokens",
                schema: "Security");

            migrationBuilder.DropTable(
                name: "UserResetPasswords",
                schema: "Security");

            migrationBuilder.DropTable(
                name: "UserRole",
                schema: "Security");

            migrationBuilder.DropTable(
                name: "VideoAttachments",
                schema: "Media");

            migrationBuilder.DropTable(
                name: "VideoProductAttachments",
                schema: "Catalog");

            migrationBuilder.DropTable(
                name: "Articles",
                schema: "Blog");

            migrationBuilder.DropTable(
                name: "Menus",
                schema: "Security");

            migrationBuilder.DropTable(
                name: "CategoryFeatures",
                schema: "Catalog");

            migrationBuilder.DropTable(
                name: "Permissions",
                schema: "Security");

            migrationBuilder.DropTable(
                name: "CompanyQuestions",
                schema: "Support");

            migrationBuilder.DropTable(
                name: "Cartables",
                schema: "Security");

            migrationBuilder.DropTable(
                name: "UserGroups",
                schema: "Security");

            migrationBuilder.DropTable(
                name: "Projects",
                schema: "Base");

            migrationBuilder.DropTable(
                name: "Videos",
                schema: "Media");

            migrationBuilder.DropTable(
                name: "Products",
                schema: "Catalog");

            migrationBuilder.DropTable(
                name: "ArticleCategories",
                schema: "Blog");

            migrationBuilder.DropTable(
                name: "Features",
                schema: "Catalog");

            migrationBuilder.DropTable(
                name: "PermissionGroups",
                schema: "Security");

            migrationBuilder.DropTable(
                name: "Roles",
                schema: "Security");

            migrationBuilder.DropTable(
                name: "Users",
                schema: "Security");

            migrationBuilder.DropTable(
                name: "VideoCategories",
                schema: "Media");

            migrationBuilder.DropTable(
                name: "Brands",
                schema: "Catalog");

            migrationBuilder.DropTable(
                name: "Categories",
                schema: "Catalog");

            migrationBuilder.DropTable(
                name: "FeatureCategories",
                schema: "Catalog");

            migrationBuilder.DropTable(
                name: "Symbols",
                schema: "Catalog");
        }
    }
}
