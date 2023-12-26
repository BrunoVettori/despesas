-- CreateEnum
CREATE TYPE "recorrencia" AS ENUM ('diaria', 'semanal', 'mensal', 'anual');

-- CreateEnum
CREATE TYPE "permissao_grupo" AS ENUM ('owner', 'adm', 'user');

-- CreateEnum
CREATE TYPE "metodo_pagamento" AS ENUM ('dinheiro', 'vale', 'transferencia', 'cartao_credito', 'cartao_debito', 'fiado');

-- CreateTable
CREATE TABLE "usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "documento" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "salario" DECIMAL(65,30) NOT NULL,
    "data_salario" INTEGER,
    "vale" DECIMAL(65,30),
    "data_vale" INTEGER,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario_grupo" (
    "id" TEXT NOT NULL,
    "gurpo_id" TEXT,
    "usuario_id" TEXT,
    "permissao" "permissao_grupo" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "usuario_grupo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gurpo" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "gurpo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "despesas" (
    "id" TEXT NOT NULL,
    "categoria_id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metodo_pagamento" "metodo_pagamento" NOT NULL,
    "usuario_id" TEXT,
    "gurpo_id" TEXT,
    "despesa_conjunta" BOOLEAN NOT NULL DEFAULT false,
    "parcelado" BOOLEAN NOT NULL DEFAULT false,
    "parcelas_id" TEXT,
    "recorrencia" "recorrencia",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "despesas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categoria" (
    "id" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parcelas" (
    "id" TEXT NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "total_vezes" INTEGER NOT NULL,
    "valor_parcelado" INTEGER NOT NULL,
    "valor_total" INTEGER NOT NULL,
    "juros" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "parcelas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_documento_key" ON "usuario"("documento");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- AddForeignKey
ALTER TABLE "usuario_grupo" ADD CONSTRAINT "usuario_grupo_gurpo_id_fkey" FOREIGN KEY ("gurpo_id") REFERENCES "gurpo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_grupo" ADD CONSTRAINT "usuario_grupo_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "despesas" ADD CONSTRAINT "despesas_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "despesas" ADD CONSTRAINT "despesas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "despesas" ADD CONSTRAINT "despesas_gurpo_id_fkey" FOREIGN KEY ("gurpo_id") REFERENCES "gurpo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "despesas" ADD CONSTRAINT "despesas_parcelas_id_fkey" FOREIGN KEY ("parcelas_id") REFERENCES "parcelas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
