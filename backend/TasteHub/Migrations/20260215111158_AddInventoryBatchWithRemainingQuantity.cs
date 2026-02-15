using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TasteHub.Migrations
{
    /// <inheritdoc />
    public partial class AddInventoryBatchWithRemainingQuantity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "RemainingQuantity",
                table: "IngredientBatches",
                type: "decimal(18,3)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RemainingQuantity",
                table: "IngredientBatches");
        }
    }
}
