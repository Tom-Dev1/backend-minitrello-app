import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { RequestCodeDto } from './dto/request-code.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    requestCode(requestCodeDto: RequestCodeDto): Promise<{
        message: string;
    }>;
    signup(signupDto: SignupDto): Promise<{
        id: string;
        email: string;
    }>;
    signin(signinDto: SigninDto): Promise<{
        accessToken: string;
    }>;
}
