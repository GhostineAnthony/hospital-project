import { ConflictException, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

@Injectable()
export class DepartmentService {
  async create(data: CreateDepartmentDto) {
    // Check if the department already exists
    const existingDep = await prisma.user.findUnique({
      where: { name: data.name },
    });

    if (existingDep) {
      throw new ConflictException(`User with email ${data.name} already exists`);
    }

    // Create department
    const department = await prisma.department.create({ data });

    return { department };
  }


  findAll() {
    return `This action returns all department`;
  }

  findOne(id: number) {
    return `This action returns a #${id} department`;
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return `This action updates a #${id} department`;
  }

  remove(id: number) {
    return `This action removes a #${id} department`;
  }
}
