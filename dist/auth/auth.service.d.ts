import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private configService;
    private transporter;
    private readonly jwtSecret;
    constructor(configService: ConfigService);
    sendVerificationCode(email: string): Promise<void>;
    signup(email: string, verificationCode: string): Promise<{
        id: string;
        email: string;
    }>;
    signin(email: string, verificationCode: string): Promise<{
        accessToken: string;
    }>;
}
