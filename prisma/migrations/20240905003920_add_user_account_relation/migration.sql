-- CreateTable
CREATE TABLE "tb_conta_pagar" (
    "pag_id" TEXT NOT NULL PRIMARY KEY,
    "pag_data_vencimento" TEXT NOT NULL,
    "pag_valor" REAL NOT NULL,
    "pag_status" TEXT NOT NULL,
    "pag_despesa" TEXT NOT NULL,
    "pag_usuario" TEXT NOT NULL,
    "pag_data_criacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "tb_conta_pagar_pag_usuario_fkey" FOREIGN KEY ("pag_usuario") REFERENCES "users" ("usu_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
