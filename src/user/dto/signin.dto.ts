
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
    isString,
} from 'class-validator';


export class signInDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;



    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;

}