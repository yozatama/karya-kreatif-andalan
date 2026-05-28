import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 409, description: 'Email already registered' })
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({ status: 200, description: 'Token refreshed' })
  async refresh(@Request() req: any) {
    return this.authService.refreshToken(req.user.id);
  }

  @Post('google')
  @ApiOperation({ summary: 'Authenticate with Google OAuth' })
  @ApiResponse({ status: 200, description: 'Google auth successful' })
  async googleAuth(@Body('token') token: string) {
    return this.authService.googleAuth(token);
  }

  @Post('whatsapp-otp')
  @ApiOperation({ summary: 'Request WhatsApp OTP' })
  @ApiResponse({ status: 200, description: 'OTP sent' })
  async whatsappOtp(@Body('phone') phone: string) {
    return this.authService.whatsappOtp(phone);
  }
}
