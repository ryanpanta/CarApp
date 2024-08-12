using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi8_CarsApp.Migrations
{
    /// <inheritdoc />
    public partial class FixTabelaTipos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Carros_CarTypeModel_TipoVeiculoId",
                table: "Carros");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CarTypeModel",
                table: "CarTypeModel");

            migrationBuilder.RenameTable(
                name: "CarTypeModel",
                newName: "Tipos");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tipos",
                table: "Tipos",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Carros_Tipos_TipoVeiculoId",
                table: "Carros",
                column: "TipoVeiculoId",
                principalTable: "Tipos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Carros_Tipos_TipoVeiculoId",
                table: "Carros");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tipos",
                table: "Tipos");

            migrationBuilder.RenameTable(
                name: "Tipos",
                newName: "CarTypeModel");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CarTypeModel",
                table: "CarTypeModel",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Carros_CarTypeModel_TipoVeiculoId",
                table: "Carros",
                column: "TipoVeiculoId",
                principalTable: "CarTypeModel",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
