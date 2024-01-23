/*
  Warnings:

  - Made the column `status` on table `Appointment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "status" SET NOT NULL;
