import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { initializeFirebase } from '../config/firebase.config';

@Module({
  imports: [ConfigModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'FIREBASE_INIT',
      useFactory: (configService: ConfigService) => {
        initializeFirebase(configService);
      },
      inject: [ConfigService],
    },
  ],
})
export class AuthModule { }
