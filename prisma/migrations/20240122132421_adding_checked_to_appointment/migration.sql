/*
  Warnings:

  - Added the required column `checked` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "checked" BOOLEAN NOT NULL;
