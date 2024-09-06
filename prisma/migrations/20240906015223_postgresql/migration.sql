-- CreateTable
CREATE TABLE "tb_users" (
    "usu_id" TEXT NOT NULL,
    "usu_nome" TEXT NOT NULL,
    "usu_email" TEXT NOT NULL,
    "usu_senha" TEXT NOT NULL,
    "usu_data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_users_pkey" PRIMARY KEY ("usu_id")
);

-- CreateTable
CREATE TABLE "tb_conta_pagar" (
    "pag_id" TEXT NOT NULL,
    "pag_data_vencimento" TIMESTAMP(3) NOT NULL,
    "pag_valor" DOUBLE PRECISION NOT NULL,
    "pag_status" TEXT NOT NULL,
    "pag_despesa" TEXT NOT NULL,
    "pag_usuario" TEXT NOT NULL,
    "pag_data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_conta_pagar_pkey" PRIMARY KEY ("pag_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_users_usu_email_key" ON "tb_users"("usu_email");

-- AddForeignKey
ALTER TABLE "tb_conta_pagar" ADD CONSTRAINT "tb_conta_pagar_pag_usuario_fkey" FOREIGN KEY ("pag_usuario") REFERENCES "tb_users"("usu_id") ON DELETE RESTRICT ON UPDATE CASCADE;
