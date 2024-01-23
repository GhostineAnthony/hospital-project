
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
    IsDateString,
} from 'class-validator';

export class appointmentDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    doctorEmail: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    patientEmail: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    time: string;
}
