/*
  Warnings:

  - Made the column `name` on table `Department` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'PATIENT', 'DOCTOR');

-- AlterTable
ALTER TABLE "Department" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL;
