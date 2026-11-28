
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { PrismaModule } from '../prisma/prisma.module';

import { JwtStrategy } from './strategies/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    // Database connection
    PrismaModule,

    // Passport JWT authentication
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),

    // JWT configuration
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');

        if (!secret) {
          throw new Error('JWT_SECRET is not configured');
        }

        return {
          secret,
          signOptions: {
            expiresIn: '15m',
          },
        };
      },
    }),
  ],

  // Authentication controller
  controllers: [AuthController],

  // Authentication providers
  providers: [
    AuthService,
    JwtStrategy,
    RolesGuard,
  ],

  // Export services needed by other modules
  exports: [
    AuthService,
    JwtModule,
  ],
})
export class AuthModule {}
