-- CreateEnum
CREATE TYPE "pagamento" AS ENUM ('dinheiro', 'saldo', 'cartao_credito', 'cartao_debito', 'pix', 'fiado');

-- CreateTable
CREATE TABLE "usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "documento" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "salario" DECIMAL(65,30) NOT NULL,
    "data_salario" TIMESTAMP(3),
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "despesas" (
    "id" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pagamento" "pagamento" NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "despesa_conjunta" BOOLEAN NOT NULL DEFAULT false,
    "parcelado" BOOLEAN NOT NULL DEFAULT false,
    "parcelas_id" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "despesas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categoria" (
    "categoria" TEXT NOT NULL,

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("categoria")
);

-- CreateTable
CREATE TABLE "parcelas" (
    "id" TEXT NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "total_vezes" INTEGER NOT NULL,
    "valor_parcelado" INTEGER NOT NULL,
    "valor_total" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "parcelas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recorrencia" (
    "id" TEXT NOT NULL,
    "despesas_id" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "recorrencia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_documento_key" ON "usuario"("documento");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- AddForeignKey
ALTER TABLE "despesas" ADD CONSTRAINT "despesas_categoria_fkey" FOREIGN KEY ("categoria") REFERENCES "categoria"("categoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "despesas" ADD CONSTRAINT "despesas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "despesas" ADD CONSTRAINT "despesas_parcelas_id_fkey" FOREIGN KEY ("parcelas_id") REFERENCES "parcelas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recorrencia" ADD CONSTRAINT "recorrencia_despesas_id_fkey" FOREIGN KEY ("despesas_id") REFERENCES "despesas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
