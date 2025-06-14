import * as admin from 'firebase-admin';
export declare class BoardsService {
    private readonly firebaseAdmin;
    constructor(firebaseAdmin: admin.app.App);
    private get db();
    create(userEmail: string, createBoardDto: {
        name: string;
        description: string;
    }): Promise<{
        id: string;
        name: string;
        description: string;
        createdBy: string;
        createdAt: admin.firestore.FieldValue;
    }>;
    findAll(userEmail: string): Promise<admin.firestore.DocumentData[]>;
    findOne(id: string, userEmail: string): Promise<admin.firestore.DocumentData>;
    update(id: string, userEmail: string, updateBoardDto: {
        name?: string;
        description?: string;
    }): Promise<{
        updatedAt: admin.firestore.FieldValue;
        name?: string;
        description?: string;
    }>;
    remove(id: string, userEmail: string): Promise<void>;
}
