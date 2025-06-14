import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Global()
@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: 'FIREBASE_ADMIN',
            useFactory: (configService: ConfigService) => {
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
            },
            inject: [ConfigService],
        },
    ],
    exports: ['FIREBASE_ADMIN'],
})
export class FirebaseModule { } 