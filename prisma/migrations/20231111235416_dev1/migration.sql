/*
  Warnings:

  - The `data_salario` column on the `usuario` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "usuario" DROP COLUMN "data_salario",
ADD COLUMN     "data_salario" INTEGER;
