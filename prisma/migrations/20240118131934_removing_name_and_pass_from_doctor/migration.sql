/*
  Warnings:

  - You are about to drop the column `email` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Doctor` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Doctor_email_key";

-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "email",
DROP COLUMN "name";
