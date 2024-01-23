/*
  Warnings:

  - You are about to drop the column `email` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Appointment` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Appointment_email_key";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "email",
DROP COLUMN "name";
