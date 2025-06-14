import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBoardDto {
    @ApiProperty({
        description: 'The name of the board',
        example: 'Project Planning'
    })
    @IsNotEmpty({ message: 'Board name is required' })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'The description of the board',
        example: 'Board for planning project tasks and milestones'
    })
    @IsString()
    description: string;
} 