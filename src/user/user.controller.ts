import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, Request, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { signInDto } from './dto/signin.dto';
import { logOutDto } from './dto/logout.dto';
import { RolesGuard } from 'src/role/role.guard';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/role/roles.decorator';
import { appointmentDto } from './dto/appointment.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
@ApiTags('user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService, private jwtservice: JwtService) { }

  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Roles(Role.DOCTOR)
  @Post('getappointment')
  async getAppointment(@Body() appointmentDto: appointmentDto,) {
    return this.userService.getAppointment(appointmentDto);
  }

  @Post('signin')
  signIn(@Body() signInDto: signInDto) {
    return this.userService.signIn(signInDto);
  }

  @Post('logout')
  logOut(@Body() logOutDto: logOutDto) {
    return this.userService.logOut(logOutDto);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get()
  @ApiOkResponse()
  async findAll() {
    return this.userService.findAll();
  }

  @Roles(Role.DOCTOR)
  @Get(':id')
  @ApiOkResponse()
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiCreatedResponse()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse()
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(+id);
  }
}

