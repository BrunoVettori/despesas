/*
  Warnings:

  - Added the required column `juros` to the `parcelas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "despesas" DROP CONSTRAINT "despesas_usuario_id_fkey";

-- AlterTable
ALTER TABLE "despesas" ADD COLUMN     "gurpo_id" TEXT,
ALTER COLUMN "usuario_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "parcelas" ADD COLUMN     "juros" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "usuario" ADD COLUMN     "gurpo_id" TEXT;

-- CreateTable
CREATE TABLE "gurpo" (
    "id" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "gurpo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_gurpo_id_fkey" FOREIGN KEY ("gurpo_id") REFERENCES "gurpo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "despesas" ADD CONSTRAINT "despesas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "despesas" ADD CONSTRAINT "despesas_gurpo_id_fkey" FOREIGN KEY ("gurpo_id") REFERENCES "gurpo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
