using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TasteHub.Migrations
{
    /// <inheritdoc />
    public partial class AddStatusAndPaidAtToPayroll : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PayrollDate",
                table: "Payrolls");

            migrationBuilder.AddColumn<DateTime>(
                name: "PaidAt",
                table: "Payrolls",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PayrollStatus",
                table: "Payrolls",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaidAt",
                table: "Payrolls");

            migrationBuilder.DropColumn(
                name: "PayrollStatus",
                table: "Payrolls");

            migrationBuilder.AddColumn<DateOnly>(
                name: "PayrollDate",
                table: "Payrolls",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));
        }
    }
}
