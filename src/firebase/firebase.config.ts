import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

export const initializeFirebase = (configService: ConfigService) => {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: configService.get('FIREBASE_PROJECT_ID'),
                clientEmail: configService.get('FIREBASE_CLIENT_EMAIL'),
                privateKey: configService.get('FIREBASE_PRIVATE_KEY')?.replace(/\\n/g, '\n'),
            }),
        });
    }
    return admin;
}; 