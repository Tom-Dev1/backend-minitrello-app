import { Controller, Post, Body, BadRequestException, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { RequestCodeDto } from './dto/request-code.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('request-code')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request verification code' })

  async requestCode(@Body() requestCodeDto: RequestCodeDto) {
    if (!requestCodeDto.email) {
      throw new BadRequestException('Email is required');
    }
    await this.authService.sendVerificationCode(requestCodeDto.email);
    return { message: 'Verification code sent to email' };
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new user account' })

  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto.email, signupDto.verificationCode);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign in user' })

  async signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto.email, signinDto.verificationCode);
  }
}
