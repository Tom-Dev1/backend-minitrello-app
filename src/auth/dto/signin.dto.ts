import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SigninDto {
    @ApiProperty({
        description: "The user's email address",
        example: "user@example.com"
    })
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @ApiProperty({
        description: "The verification code sent to the user's email",
        example: "123456"
    })
    @IsNotEmpty({ message: 'Verification code is required' })
    @IsString()
    @Length(6, 6, { message: 'Verification code must be 6 characters long' })
    verificationCode: string;
} 