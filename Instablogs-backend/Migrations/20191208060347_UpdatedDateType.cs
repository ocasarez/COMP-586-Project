using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Instablogs.Migrations
{
    public partial class UpdatedDateType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "BlogTimeStamp",
                table: "Blogs",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "BlogTimeStamp",
                table: "Blogs",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(string));
        }
    }
}
