import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
export declare const initializeFirebase: (configService: ConfigService) => typeof admin;
