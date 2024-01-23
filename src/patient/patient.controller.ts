import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Roles } from 'src/role/roles.decorator';
import { Role } from 'src/role/role.enum';
import { requestAppointmentdto } from './dto/requestAppointment.dto';
import { userInfo } from 'os';
import { RolesGuard } from 'src/role/role.guard';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) { }

  @Roles(Role.DOCTOR)
  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @Roles(Role.PATIENT)
  @UseGuards(RolesGuard)
  @Post('requestappointment')
  requestAppointment(@Body() requestAppointmentDto: requestAppointmentdto, @Req() request) {
    return this.patientService.requestAppointment(requestAppointmentDto, request)
  }

  @Roles(Role.PATIENT)
  @UseGuards(RolesGuard)
  @Post('changeStatusOfAppointment')
  changeStatusOfAppointment(@Body() requestAppointmentDto: requestAppointmentdto, @Req() request) {
    return this.patientService.changeStatusOfAppointment(requestAppointmentDto, request)
  }

  @Roles(Role.PATIENT)
  @UseGuards(RolesGuard)
  @Post('cancelappointment')
  cancelAppointment(@Body() time: Date, @Req() req) {
    return this.patientService.cancelAppointment(time, req)
  }

  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(+id);
  }
}
