import { MESSAGES } from '@nestjs/core/constants';
import { ApiProperty } from '@nestjs/swagger';
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

export class CreateDepartmentDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;
}



