/*
  Warnings:

  - You are about to drop the column `email` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Patient` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Patient_email_key";

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "email",
DROP COLUMN "name";
