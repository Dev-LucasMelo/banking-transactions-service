-- CreateEnum
CREATE TYPE "Status" AS ENUM ('realizado', 'pendente', 'cancelado');

-- CreateTable
CREATE TABLE "Transacao" (
    "id" TEXT NOT NULL,
    "tipo" VARCHAR(20) NOT NULL,
    "valor" DECIMAL(15,2) NOT NULL,
    "descricao" VARCHAR(255),
    "status" "Status" NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,
    "conta_destino_id" TEXT NOT NULL,
    "conta_origem_id" TEXT NOT NULL,

    CONSTRAINT "Transacao_pkey" PRIMARY KEY ("id")
);
