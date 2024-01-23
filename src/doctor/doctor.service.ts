import { ConflictException, Injectable, Req } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { createDecipheriv } from 'crypto';
import { checkAppointmentDto } from './dto/checkAppointment.dto';

const prisma = new PrismaClient();

@Injectable()
export class DoctorService {
  async create(data: CreateDoctorDto) {
    // Check if the email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException(`User with email ${data.email} already exists`);
    }

    // Hashing password
    const hashPassword = await bcrypt.hash(data.password, 10);
    const doctorWithoutPassword = { ...data, password: hashPassword };

    // Deleting departementId from data
    if ('departementID' in doctorWithoutPassword) {
      delete doctorWithoutPassword.departementID;
    }

    console.log(doctorWithoutPassword);

    // Create user
    const user = await prisma.user.create({ data: doctorWithoutPassword });

    // Get id
    const userId = user.id;
    const departementID = data.departementID;
    const doctorData = { userId, departementID };

    // Create doctor
    const doctor = await prisma.doctor.create({ data: doctorData });

    return { doctor };
  }

  async checkAppointment(data: checkAppointmentDto) {
    const checked = true;
    //make sure if the time and the patientId is right
    const patientID = data.patientID;
    const time = data.time;
    const appointmentAccordingToPatientId = prisma.appointment.findMany({ where: { patientID } });
    (await appointmentAccordingToPatientId).map((app) => {
      const timeAccordingToPatientId = app.time;
      if (time === timeAccordingToPatientId) {
        const id = app.id;
        const approve = data.approve;
        const appointmentData = { checked, approve }
        prisma.appointment.update({ where: { id }, data: appointmentData })
      }
    })
    return;
  }

  async getAppointment(@Req() req) {
    const user = req.userId;
    const doctorID = user.id;
    prisma.appointment.findMany({ where: { doctorID } });
  }

  findAll() {
    return prisma.doctor.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} doctor`;
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return `This action updates a #${id} doctor`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctor`;
  }
}
