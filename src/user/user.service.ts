import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Doctor, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { signInDto } from './dto/signin.dto';
import { logOutDto } from './dto/logout.dto';
import { Role } from 'src/role/role.enum';
import { appointmentDto } from './dto/appointment.dto';

const prisma = new PrismaClient();

@Injectable()

export class UserService {

  private jwtService = new JwtService();

  async create(data: CreateUserDto) {
    //hashing password 
    const hashPassword = await bcrypt.hash(data.password, 10);
    const userWithoutPassword = { ...data, password: hashPassword }

    //deleting departmentID from user array to fit in prisma schema
    if ('departementID' in userWithoutPassword) {
      delete userWithoutPassword.departementID;
    }

    //create user
    const user = await prisma.user.create({ data: userWithoutPassword })

    //check if doctor or patient or admin
    console.log(data);
    if (data && data.role === Role.PATIENT) {
      //get patient ID
      const userId = user.id
      //create patient
      const patient = await prisma.patient.create({ data: { userId } })
      return patient;
    }
    else if (data && data.role === Role.DOCTOR) {
      // Get doctor ID and department
      const userId = user.id;
      const departementID = data.departementID;
      const doctorData = { userId, departementID };
      // Create doctor
      const doctor = await prisma.doctor.create({ data: doctorData });
      return doctor;
    }
    else {
      console.log('this is an admin')
    }

    return data;
  }

  async signIn(data: signInDto): Promise<any> {
    // Fetch a user with the given email
    const email = data.email;
    const password = data.password;
    const user = await prisma.user.findUnique({ where: { email } });
    // If no user is found, throw an error
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password does not match, throw an error
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // Generate a JWT containing the user's ID
    const accessToken = this.jwtService.sign({ userId: user.id, role: user.role }, { secret: '@nth0ny' });

    // Update the user's token in the database
    await prisma.user.update({
      where: { email },
      data: { token: accessToken },
    });

    // Return the generated access token
    return { accessToken };
  }

  logOut(data: logOutDto) {
    return prisma.user.update({
      where: { email: data.email }, data: { token: null }
    });
  }

  async getAppointment(data: appointmentDto) {
    const doctorID: number = await getDoctorIdByEmail(data.doctorEmail);
    const patientID: number = await getPatientIdByEmail(data.patientEmail);
    const time: Date = new Date(data.time);
    const checked = true;
    const status = 'Pending'
    const appointmentData = { time, patientID, doctorID, checked, status }

    const appointment = await prisma.appointment.create({ data: appointmentData })
    return appointment;

    async function getPatientIdByEmail(userEmail: string): Promise<number> {
      try {
        // Use Prisma to find the user by email and select the userId
        const user = await prisma.user.findUnique({
          where: {
            email: userEmail,
          },
          select: {
            patient: {
              select: {
                id: true,
              },
            },
          },
        });

        // If the user exists and has a patient relationship, return the patientId
        if (user?.patient?.id) {
          return user.patient.id;
        }

        // If the user does not exist or does not have a patient relationship, return null
        return;
      } catch (error) {
        console.error('Error getting patientId by email:', error);
        throw error;
      }
    }

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
  }


  async findAll() {
    const pageSize = 10; // Number of items per page
    // const pageNumber = 2; // Page number

    const users = await prisma.user.findMany({
      // skip: (pageNumber - 1) * pageSize,
      take: pageSize,
    });
  }

  async findOne(id: number) {
    console.log('inside fineOne function')
    // return `This action returns a #${id} user`;
    return prisma.user.findMany({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // return `This action updates a #${id} user`;
    return prisma.user.update({
      where: { id }, data: updateUserDto,
    })
  }

  async remove(id: number) {
    // return `This action removes a #${id} user`;
    return prisma.user.delete({ where: { id } })
  }
}
