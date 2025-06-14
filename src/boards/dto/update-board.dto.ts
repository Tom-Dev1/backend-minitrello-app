import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateBoardDto {
    @ApiProperty({
        description: 'The new name of the board',
        example: 'Updated Project Planning'
    })
    @IsString()
    name?: string;

    @ApiProperty({
        description: 'The new description of the board',
        example: 'Updated board description'
    })
    @IsString()
    description?: string;
} 