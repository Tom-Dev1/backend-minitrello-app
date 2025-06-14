// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private transporter;
  private readonly jwtSecret: string;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: configService.get('EMAIL_USER'),
        pass: configService.get('EMAIL_PASS'),
      },
    });
    this.jwtSecret = this.configService.get<string>('JWT_SECRET') || '123123';
  }

  async sendVerificationCode(email: string): Promise<void> {
    // Generate a 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes expiry

    const db = admin.firestore();
    // collection: create or update document ID is email
    // set: overwrite 
    // merge: true -> helps not to lose old user data if only updating code.
    await db.collection('users').doc(email).set({
      verificationCode,
      expiresAt,
      email,
    }, { merge: true });

    // Send verification email
    const mailOptions = {
      from: this.configService.get('EMAIL_USER'),
      to: email,
      subject: 'Your Verification Code',
      html: `
        <h1>Email Verification</h1>
        <p>Your verification code is: <strong>${verificationCode}</strong></p>
        <p>This code will expire in 5 minutes.</p>
        <p>If you didn't request this code, please ignore this email.</p>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async signup(email: string, verificationCode: string): Promise<{ id: string; email: string }> {
    const db = admin.firestore();
    const userSnap = await db.collection('users').doc(email).get();
    const userData = userSnap.data();

    if (!userData || userData.verificationCode !== verificationCode || Date.now() > userData.expiresAt) {
      throw new UnauthorizedException('Invalid or expired verification code');
    }

    // Check if user already exists
    const existingUser = await db.collection('users').doc(email).get();
    if (existingUser.exists && existingUser.data()?.isVerified) {
      throw new UnauthorizedException('User already exists');
    }

    // Create user document
    await db.collection('users').doc(email).set({
      email,
      isVerified: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { id: email, email };
  }

  async signin(email: string, verificationCode: string): Promise<{ accessToken: string }> {
    const db = admin.firestore();
    const userSnap = await db.collection('users').doc(email).get();
    const userData = userSnap.data();

    if (!userData || userData.verificationCode !== verificationCode || Date.now() > userData.expiresAt) {
      throw new UnauthorizedException('Invalid or expired verification code');
    }

    // Check if user exists and is verified
    if (!userData.isVerified) {
      throw new UnauthorizedException('User is not verified');
    }

    const payload = { email, sub: email };
    const accessToken = jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });
    return { accessToken };
  }
}
