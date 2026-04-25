import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { seedPlatformAdmin } from "./platform.admin.seed";


@Injectable()

export class SeedService {

    constructor(private prisma: PrismaService) { }

    async runAllSeeds() {

        await seedPlatformAdmin(this.prisma)
    }
}