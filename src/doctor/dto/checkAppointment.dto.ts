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
    IsBoolean,
} from 'class-validator';

export class checkAppointmentDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    patientID: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    approve: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    time: Date;

}
