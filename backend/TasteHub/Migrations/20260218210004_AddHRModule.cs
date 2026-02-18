using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TasteHub.Migrations
{
    /// <inheritdoc />
    public partial class AddHRModule : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attendances_Users_UserId",
                table: "Attendances");

            migrationBuilder.DropForeignKey(
                name: "FK_Leaves_Users_UserId",
                table: "Leaves");

            migrationBuilder.DropForeignKey(
                name: "FK_Payrolls_Users_UserId",
                table: "Payrolls");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkSchedules_ShiftTypes_ShiftTypeId",
                table: "WorkSchedules");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkSchedules_Users_UserId",
                table: "WorkSchedules");

            migrationBuilder.DropIndex(
                name: "IX_Attendances_UserId",
                table: "Attendances");

            migrationBuilder.DropColumn(
                name: "EndTime",
                table: "WorkSchedules");

            migrationBuilder.DropColumn(
                name: "StartTime",
                table: "WorkSchedules");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "WorkSchedules",
                newName: "EmployeeId");

            migrationBuilder.RenameIndex(
                name: "IX_WorkSchedules_UserId",
                table: "WorkSchedules",
                newName: "IX_WorkSchedules_EmployeeId");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Payrolls",
                newName: "EmployeeId");

            migrationBuilder.RenameIndex(
                name: "IX_Payrolls_UserId",
                table: "Payrolls",
                newName: "IX_Payrolls_EmployeeId");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Leaves",
                newName: "EmployeeId");

            migrationBuilder.RenameIndex(
                name: "IX_Leaves_UserId",
                table: "Leaves",
                newName: "IX_Leaves_EmployeeId");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Attendances",
                newName: "OvertimeMinutes");

            migrationBuilder.AlterColumn<int>(
                name: "ShiftTypeId",
                table: "WorkSchedules",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "BreakMinutes",
                table: "ShiftTypes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<short>(
                name: "PayrollYear",
                table: "Payrolls",
                type: "smallint",
                nullable: false,
                oldClrType: typeof(byte),
                oldType: "tinyint");

            migrationBuilder.AddColumn<int>(
                name: "DefaultDaysPerYear",
                table: "LeaveTypes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsPaid",
                table: "LeaveTypes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "ApprovedAt",
                table: "Leaves",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ApprovedByEmployeeId",
                table: "Leaves",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CheckOut",
                table: "Attendances",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(TimeOnly),
                oldType: "time");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CheckIn",
                table: "Attendances",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(TimeOnly),
                oldType: "time");

            migrationBuilder.AlterColumn<string>(
                name: "AdditionalNotes",
                table: "Attendances",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "EmployeeId",
                table: "Attendances",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsApproved",
                table: "Attendances",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "LateMinutes",
                table: "Attendances",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "JobTitles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NameEn = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    NameAr = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobTitles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PersonId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    HireDate = table.Column<DateOnly>(type: "date", nullable: false),
                    TerminationDate = table.Column<DateOnly>(type: "date", nullable: true),
                    JobTitleId = table.Column<int>(type: "int", nullable: false),
                    BaseSalary = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    EmploymentStatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Employees_JobTitles_JobTitleId",
                        column: x => x.JobTitleId,
                        principalTable: "JobTitles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Employees_People_PersonId",
                        column: x => x.PersonId,
                        principalTable: "People",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Employees_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Leaves_ApprovedByEmployeeId",
                table: "Leaves",
                column: "ApprovedByEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Attendances_EmployeeId",
                table: "Attendances",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_JobTitleId",
                table: "Employees",
                column: "JobTitleId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_PersonId",
                table: "Employees",
                column: "PersonId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_UserId",
                table: "Employees",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Attendances_Employees_EmployeeId",
                table: "Attendances",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Leaves_Employees_ApprovedByEmployeeId",
                table: "Leaves",
                column: "ApprovedByEmployeeId",
                principalTable: "Employees",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Leaves_Employees_EmployeeId",
                table: "Leaves",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Payrolls_Employees_EmployeeId",
                table: "Payrolls",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkSchedules_Employees_EmployeeId",
                table: "WorkSchedules",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkSchedules_ShiftTypes_ShiftTypeId",
                table: "WorkSchedules",
                column: "ShiftTypeId",
                principalTable: "ShiftTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attendances_Employees_EmployeeId",
                table: "Attendances");

            migrationBuilder.DropForeignKey(
                name: "FK_Leaves_Employees_ApprovedByEmployeeId",
                table: "Leaves");

            migrationBuilder.DropForeignKey(
                name: "FK_Leaves_Employees_EmployeeId",
                table: "Leaves");

            migrationBuilder.DropForeignKey(
                name: "FK_Payrolls_Employees_EmployeeId",
                table: "Payrolls");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkSchedules_Employees_EmployeeId",
                table: "WorkSchedules");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkSchedules_ShiftTypes_ShiftTypeId",
                table: "WorkSchedules");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "JobTitles");

            migrationBuilder.DropIndex(
                name: "IX_Leaves_ApprovedByEmployeeId",
                table: "Leaves");

            migrationBuilder.DropIndex(
                name: "IX_Attendances_EmployeeId",
                table: "Attendances");

            migrationBuilder.DropColumn(
                name: "BreakMinutes",
                table: "ShiftTypes");

            migrationBuilder.DropColumn(
                name: "DefaultDaysPerYear",
                table: "LeaveTypes");

            migrationBuilder.DropColumn(
                name: "IsPaid",
                table: "LeaveTypes");

            migrationBuilder.DropColumn(
                name: "ApprovedAt",
                table: "Leaves");

            migrationBuilder.DropColumn(
                name: "ApprovedByEmployeeId",
                table: "Leaves");

            migrationBuilder.DropColumn(
                name: "EmployeeId",
                table: "Attendances");

            migrationBuilder.DropColumn(
                name: "IsApproved",
                table: "Attendances");

            migrationBuilder.DropColumn(
                name: "LateMinutes",
                table: "Attendances");

            migrationBuilder.RenameColumn(
                name: "EmployeeId",
                table: "WorkSchedules",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_WorkSchedules_EmployeeId",
                table: "WorkSchedules",
                newName: "IX_WorkSchedules_UserId");

            migrationBuilder.RenameColumn(
                name: "EmployeeId",
                table: "Payrolls",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Payrolls_EmployeeId",
                table: "Payrolls",
                newName: "IX_Payrolls_UserId");

            migrationBuilder.RenameColumn(
                name: "EmployeeId",
                table: "Leaves",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Leaves_EmployeeId",
                table: "Leaves",
                newName: "IX_Leaves_UserId");

            migrationBuilder.RenameColumn(
                name: "OvertimeMinutes",
                table: "Attendances",
                newName: "UserId");

            migrationBuilder.AlterColumn<int>(
                name: "ShiftTypeId",
                table: "WorkSchedules",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<TimeOnly>(
                name: "EndTime",
                table: "WorkSchedules",
                type: "time",
                nullable: false,
                defaultValue: new TimeOnly(0, 0, 0));

            migrationBuilder.AddColumn<TimeOnly>(
                name: "StartTime",
                table: "WorkSchedules",
                type: "time",
                nullable: false,
                defaultValue: new TimeOnly(0, 0, 0));

            migrationBuilder.AlterColumn<byte>(
                name: "PayrollYear",
                table: "Payrolls",
                type: "tinyint",
                nullable: false,
                oldClrType: typeof(short),
                oldType: "smallint");

            migrationBuilder.AlterColumn<TimeOnly>(
                name: "CheckOut",
                table: "Attendances",
                type: "time",
                nullable: false,
                defaultValue: new TimeOnly(0, 0, 0),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AlterColumn<TimeOnly>(
                name: "CheckIn",
                table: "Attendances",
                type: "time",
                nullable: false,
                defaultValue: new TimeOnly(0, 0, 0),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "AdditionalNotes",
                table: "Attendances",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Attendances_UserId",
                table: "Attendances",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Attendances_Users_UserId",
                table: "Attendances",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Leaves_Users_UserId",
                table: "Leaves",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Payrolls_Users_UserId",
                table: "Payrolls",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkSchedules_ShiftTypes_ShiftTypeId",
                table: "WorkSchedules",
                column: "ShiftTypeId",
                principalTable: "ShiftTypes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkSchedules_Users_UserId",
                table: "WorkSchedules",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
