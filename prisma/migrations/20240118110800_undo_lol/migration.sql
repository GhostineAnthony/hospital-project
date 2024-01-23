/*
  Warnings:

  - You are about to drop the column `password` on the `Patient` table. All the data in the column will be lost.
  - Made the column `name` on table `Doctor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Patient` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Doctor" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "password",
ALTER COLUMN "name" SET NOT NULL;
