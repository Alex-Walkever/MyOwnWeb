using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyOwnWeb.Migrations
{
    /// <inheritdoc />
    public partial class ExperienceTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Experiences",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EnTitle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EsTitle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EnResume = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EsResume = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EnProject = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EsProject = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EnSkills = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EsSkills = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UrlToProject = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CurrentWork = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Experiences", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Experiences");
        }
    }
}
