import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

export const initializeFirebase = (configService: ConfigService) => {
    const projectId = configService.get('FIREBASE_PROJECT_ID');
    const privateKey = configService.get('FIREBASE_PRIVATE_KEY')?.replace(/\\n/g, '\n');
    const clientEmail = configService.get('FIREBASE_CLIENT_EMAIL');

    if (!projectId || !privateKey || !clientEmail) {
        throw new Error(
            'Missing required Firebase configuration. Please check your .env file has FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, and FIREBASE_CLIENT_EMAIL'
        );
    }

    const serviceAccount = {
        projectId,
        privateKey,
        clientEmail,
    };

    try {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
        });
        console.log('Firebase initialized successfully');
    } catch (error) {
        console.error('Error initializing Firebase:', error);
        throw error;
    }
}; 