import { MESSAGES } from '@nestjs/core/constants';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/role/role.enum';
import {
  validate,
  validateOrReject,
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max,
  IsNotEmpty,
  IsString,
  isEmail,
  IsNumber,
} from 'class-validator';

export class CreateDoctorDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  //  @ApiProperty({ required: false })
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  departementID: number;

  @IsNotEmpty()
  role: Role;
}
