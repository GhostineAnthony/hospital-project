
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
  IsEnum,
  isEnum,
} from 'class-validator';

export class CreateUserDto {
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

  // @ApiProperty()
  // @IsEnum(['ADMIM', 'DOCTOR', 'PATIENT'], { message: 'Use correct role' })
  // @IsNotEmpty()
  // @IsString()
  // role: 'doctor' | 'patient' | 'admin';
  // @IsEnum(['ADMIM', 'DOCTOR', 'PATIENT'], { message: 'Use correct role' })
  @IsNotEmpty()
  role: Role;


  @ApiProperty()
  @IsNotEmpty()
  departementID: number;
}
