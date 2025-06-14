import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Boards')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('boards')
export class BoardsController {
    constructor(private readonly boardsService: BoardsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new board' })
    async create(@Request() req, @Body() createBoardDto: CreateBoardDto) {
        return this.boardsService.create(req.user.email, createBoardDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all boards for the authenticated user' })
    async findAll(@Request() req) {
        return this.boardsService.findAll(req.user.email);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a specific board by ID' })
    async findOne(@Request() req, @Param('id') id: string) {
        return this.boardsService.findOne(id, req.user.email);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a specific board' })
    async update(
        @Request() req,
        @Param('id') id: string,
        @Body() updateBoardDto: UpdateBoardDto,
    ) {
        return this.boardsService.update(id, req.user.email, updateBoardDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a specific board' })
    async remove(@Request() req, @Param('id') id: string) {
        await this.boardsService.remove(id, req.user.email);
    }
} 