
import {
  Controller,
  Post,
  Get,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';

import { CurrentUser } from './decorators/current-user.decorator';
import { Roles } from './decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // USER REGISTRATION
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  // USER LOGIN - GENERATE JWT ACCESS TOKEN
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // PROTECTED USER PROFILE
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@CurrentUser() user: any) {
    return {
      message: 'Authenticated user profile',
      user,
    };
  }

  // OWNER-ONLY DASHBOARD EXAMPLE
  @Get('owner-dashboard')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER')
  getOwnerDashboard(@CurrentUser() user: any) {
    return {
      message: 'Welcome to the owner dashboard',
      user,
    };
  }
}
