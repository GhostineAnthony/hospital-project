-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "patientID" INTEGER NOT NULL,
    "doctorID" INTEGER NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_email_key" ON "Appointment"("email");

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_departementID_fkey" FOREIGN KEY ("departementID") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_doctorID_fkey" FOREIGN KEY ("doctorID") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
