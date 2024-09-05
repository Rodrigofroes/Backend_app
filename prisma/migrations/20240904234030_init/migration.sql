-- CreateTable
CREATE TABLE "users" (
    "usu_id" TEXT NOT NULL PRIMARY KEY,
    "usu_nome" TEXT NOT NULL,
    "usu_email" TEXT NOT NULL,
    "usu_senha" TEXT NOT NULL,
    "usu_data_criacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "users_usu_email_key" ON "users"("usu_email");
