import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class BoardsService {
    constructor(
        @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App
    ) { }

    private get db() {
        return this.firebaseAdmin.firestore();
    }

    async create(userEmail: string, createBoardDto: { name: string; description: string }) {
        const boardRef = this.db.collection('boards').doc();
        const boardData = {
            id: boardRef.id,
            name: createBoardDto.name,
            description: createBoardDto.description,
            createdBy: userEmail,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        };

        await boardRef.set(boardData);
        return boardData;
    }

    async findAll(userEmail: string) {
        const boardsSnapshot = await this.db
            .collection('boards')
            .where('createdBy', '==', userEmail)
            .get();

        return boardsSnapshot.docs.map(doc => doc.data());
    }

    async findOne(id: string, userEmail: string) {
        const boardDoc = await this.db.collection('boards').doc(id).get();

        if (!boardDoc.exists) {
            throw new NotFoundException('Board not found');
        }

        const boardData = boardDoc.data();
        if (!boardData || boardData.createdBy !== userEmail) {
            throw new NotFoundException('Board not found');
        }

        return boardData;
    }

    async update(id: string, userEmail: string, updateBoardDto: { name?: string; description?: string }) {
        const boardRef = this.db.collection('boards').doc(id);
        const boardDoc = await boardRef.get();

        if (!boardDoc.exists) {
            throw new NotFoundException('Board not found');
        }

        const boardData = boardDoc.data();
        if (!boardData || boardData.createdBy !== userEmail) {
            throw new NotFoundException('Board not found');
        }

        const updateData = {
            ...updateBoardDto,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        };

        await boardRef.update(updateData);
        return { ...boardData, ...updateData };
    }

    async remove(id: string, userEmail: string) {
        const boardRef = this.db.collection('boards').doc(id);
        const boardDoc = await boardRef.get();

        if (!boardDoc.exists) {
            throw new NotFoundException('Board not found');
        }

        const boardData = boardDoc.data();
        if (!boardData || boardData.createdBy !== userEmail) {
            throw new NotFoundException('Board not found');
        }

        await boardRef.delete();
    }
} 