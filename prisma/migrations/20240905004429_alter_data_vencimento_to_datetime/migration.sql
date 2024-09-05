/*
  Warnings:

  - You are about to alter the column `pag_data_vencimento` on the `tb_conta_pagar` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tb_conta_pagar" (
    "pag_id" TEXT NOT NULL PRIMARY KEY,
    "pag_data_vencimento" DATETIME NOT NULL,
    "pag_valor" REAL NOT NULL,
    "pag_status" TEXT NOT NULL,
    "pag_despesa" TEXT NOT NULL,
    "pag_usuario" TEXT NOT NULL,
    "pag_data_criacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "tb_conta_pagar_pag_usuario_fkey" FOREIGN KEY ("pag_usuario") REFERENCES "users" ("usu_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tb_conta_pagar" ("pag_data_criacao", "pag_data_vencimento", "pag_despesa", "pag_id", "pag_status", "pag_usuario", "pag_valor") SELECT "pag_data_criacao", "pag_data_vencimento", "pag_despesa", "pag_id", "pag_status", "pag_usuario", "pag_valor" FROM "tb_conta_pagar";
DROP TABLE "tb_conta_pagar";
ALTER TABLE "new_tb_conta_pagar" RENAME TO "tb_conta_pagar";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
