import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { RolesGuard } from 'src/role/role.guard';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/role/roles.decorator';
import { checkAppointmentDto } from './dto/checkAppointment.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) { }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @Roles(Role.DOCTOR)
  @Get('getappointment')
  getAppointment(@Req() req) {
    return this.doctorService.getAppointment(req);
  }

  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  @Post('checkappointment')
  checkAppointment(@Body() checkAppointmentDto: checkAppointmentDto) {
    return this.doctorService.checkAppointment(checkAppointmentDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(+id, updateDoctorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorService.remove(+id);
  }
}
