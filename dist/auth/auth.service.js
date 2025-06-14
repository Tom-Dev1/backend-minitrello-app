"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const config_1 = require("@nestjs/config");
const jwt = require("jsonwebtoken");
let AuthService = class AuthService {
    configService;
    transporter;
    jwtSecret;
    constructor(configService) {
        this.configService = configService;
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: configService.get('EMAIL_USER'),
                pass: configService.get('EMAIL_PASS'),
            },
        });
        this.jwtSecret = this.configService.get('JWT_SECRET') || '123123';
    }
    async sendVerificationCode(email) {
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = Date.now() + 5 * 60 * 1000;
        const db = admin.firestore();
        await db.collection('users').doc(email).set({
            verificationCode,
            expiresAt,
            email,
        }, { merge: true });
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
    async signup(email, verificationCode) {
        const db = admin.firestore();
        const userSnap = await db.collection('users').doc(email).get();
        const userData = userSnap.data();
        if (!userData || userData.verificationCode !== verificationCode || Date.now() > userData.expiresAt) {
            throw new common_1.UnauthorizedException('Invalid or expired verification code');
        }
        const existingUser = await db.collection('users').doc(email).get();
        if (existingUser.exists && existingUser.data()?.isVerified) {
            throw new common_1.UnauthorizedException('User already exists');
        }
        await db.collection('users').doc(email).set({
            email,
            isVerified: true,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        return { id: email, email };
    }
    async signin(email, verificationCode) {
        const db = admin.firestore();
        const userSnap = await db.collection('users').doc(email).get();
        const userData = userSnap.data();
        if (!userData || userData.verificationCode !== verificationCode || Date.now() > userData.expiresAt) {
            throw new common_1.UnauthorizedException('Invalid or expired verification code');
        }
        if (!userData.isVerified) {
            throw new common_1.UnauthorizedException('User is not verified');
        }
        const payload = { email, sub: email };
        const accessToken = jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });
        return { accessToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map