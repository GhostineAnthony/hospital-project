/*
  Warnings:

  - You are about to drop the `Appointment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Department` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_doctorID_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_patientID_fkey";

-- DropForeignKey
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_departementID_fkey";

-- DropTable
DROP TABLE "Appointment";

-- DropTable
DROP TABLE "Department";
