
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  // ============================================
  // USER REGISTRATION
  // ============================================

  async register(registerDto: RegisterDto) {
    const { name, businessName, email, password } = registerDto;

    // 1. Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // 2. Check whether the email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }

    // 3. Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 12);

    // 4. Generate a unique tenant slug
    const slug = `${businessName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')}-${randomUUID().slice(0, 8)}`;

    // 5. Create tenant and user inside one transaction
    const user = await this.prisma.$transaction(async (tx) => {

      // Create the tenant first
      const tenant = await tx.tenant.create({
        data: {
          name: businessName.trim(),
          slug: slug,
        },
      });

      // Create user and connect to the tenant
      const newUser = await tx.user.create({
        data: {
          name: name.trim(),
          email: normalizedEmail,
          passwordHash: hashedPassword,
          role: 'OWNER',

          tenant: {
            connect: {
              id: tenant.id,
            },
          },
        },

        // Never return the password hash
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          tenantId: true,
          createdAt: true,
        },
      });

      return newUser;
    });

    // 6. Return registration response
    return {
      message: 'Registration successful',
      user,
    };
  }

  // ============================================
  // USER LOGIN
  // ============================================

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // 1. Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // 2. Find user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    // 3. Check whether user exists
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // 4. Compare entered password with stored password hash
    const isPasswordValid = await bcrypt.compare(
      password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // 5. Return safe user information
    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
    };

    return {
      message: 'Login successful',
      user: safeUser,
    };
  }
}

