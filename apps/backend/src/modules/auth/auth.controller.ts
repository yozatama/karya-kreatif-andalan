import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { RegisterDto, LoginDto } from "./dto";
import { Public, CurrentUser } from "../../common/decorators";
import { JwtAuthGuard } from "../../common/guards";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("register")
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Public()
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  async refresh(@Body("refreshToken") refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("profile")
  async getProfile(@CurrentUser("id") userId: string) {
    return this.authService.getProfile(userId);
  }
}
