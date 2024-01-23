
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
    IsDateString,
    IsEnum,
} from 'class-validator';

export class requestAppointmentdto {

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    time: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(['Pending ', 'on creation', 'Done'], { message: 'choose the right status' })
    status: 'Pending ' | 'on creation' | 'Done';
}
