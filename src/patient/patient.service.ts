import { Injectable, Req } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { requestAppointmentdto } from './dto/requestAppointment.dto';

const prisma = new PrismaClient();

@Injectable()
export class PatientService {
  async create(data: CreatePatientDto) {
    //hashing password
    const hashPassword = await bcrypt.hash(data.password, 10);
    const patientWithoutPassword = { ...data, password: hashPassword }

    // Create user
    const user = await prisma.user.create({ data: patientWithoutPassword })

    // Get id
    const userId = user.id

    //Create patient
    const patient = await prisma.patient.create({ data: { userId } })
    return patient;
  }

  async requestAppointment(data: requestAppointmentdto, @Req() req) {
    const user = req.user;
    const checked = false;
    const patientID: number = user.userId;
    const doctorID = await getDoctorIdByEmail(data.email);
    const time: Date = new Date(data.time);
    const status = data.status;
    const appointmentData = { patientID, doctorID, time, checked, status }
    prisma.appointment.create({ data: appointmentData })

    async function getDoctorIdByEmail(userEmail: string): Promise<number> {
      try {
        // Use Prisma to find the user by email and select the userId
        const user = await prisma.user.findUnique({
          where: {
            email: userEmail,
          },
          select: {
            doctor: {
              select: {
                id: true,
              },
            },
          },
        });

        // If the user exists and has a patient relationship, return the patientId
        if (user?.doctor?.id) {
          return user.doctor.id;
        }

        // If the user does not exist or does not have a patient relationship, return null
        return;
      } catch (error) {
        console.error('Error getting doctorId by email:', error);
        throw error;
      }
    }
    return appointmentData;
  }

  async changeStatusOfAppointment(data: requestAppointmentdto, @Req() req) {
    const user = req.user;
    const status = data.status;
    const patientID: number = user.userId;
    const appointmentId = prisma.appointment.findFirst({ where: { patientID } })
    const id = (await appointmentId).id
    prisma.appointment.update({ where: { id }, data: { status } })
    return prisma.appointment.findMany();
  }

  async cancelAppointment(time: Date, @Req() req) {
    //find all appointment for this user
    const appointment = prisma.appointment.findMany({ where: { time } })
    //get the patientID who is signed in already
    const user = req.user;
    const userId = user.userId;
    //make sure that the patient have already a appointment at the desire time before updating
    (await appointment).map((app) => {
      const patientId = app.patientID
      if (patientId === userId) {
        const appointmentId = app.id
        prisma.appointment.delete({ where: { id: appointmentId } })
        return app;
      }
    })
    return 'there is no appointment at this time for this user';
  }

  findAll() {
    return prisma.patient.findMany();
  }

  findOne(id: number) {
    // return `This action returns a #${id} patient`;
    return prisma.patient.findMany();
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
