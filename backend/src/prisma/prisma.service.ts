
import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';

import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly pool: Pool;

  constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    super({
      adapter: new PrismaPg(pool),
    });

    this.pool = pool;
  }

  // Connect to PostgreSQL when NestJS starts
  async onModuleInit() {
    await this.$connect();
    console.log('PostgreSQL database connected successfully!');
  }

  // Disconnect when NestJS shuts down
  async onModuleDestroy() {
    await this.$disconnect();
    await this.pool.end();
    console.log('PostgreSQL database disconnected.');
  }
}
