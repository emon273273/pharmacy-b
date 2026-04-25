import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        const pool = new Pool({ connectionString: process.env.DATABASE_URL });
        const adapter = new PrismaPg(pool);
        super({ 
            adapter,
            log: ['query', 'info', 'warn', 'error'],
        });
    }

    async onModuleInit() {
        try {
            await this.$connect();
            console.log('✅ Database connected successfully');
        } catch (e) {
            console.error('❌ Connection error. Ensure DATABASE_URL is set in .env');
        }
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}