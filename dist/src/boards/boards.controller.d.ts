import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
export declare class BoardsController {
    private readonly boardsService;
    constructor(boardsService: BoardsService);
    create(req: any, createBoardDto: CreateBoardDto): Promise<{
        id: string;
        name: string;
        description: string;
        createdBy: string;
        createdAt: FirebaseFirestore.FieldValue;
    }>;
    findAll(req: any): Promise<FirebaseFirestore.DocumentData[]>;
    findOne(req: any, id: string): Promise<FirebaseFirestore.DocumentData>;
    update(req: any, id: string, updateBoardDto: UpdateBoardDto): Promise<{
        updatedAt: FirebaseFirestore.FieldValue;
        name?: string;
        description?: string;
    }>;
    remove(req: any, id: string): Promise<void>;
}
