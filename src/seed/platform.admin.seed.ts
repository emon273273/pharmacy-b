import { PrismaClient, UserRole } from "@prisma/client";

import * as bcrypt from "bcryptjs";
import prismaConfig from "prisma.config";


export async function seedPlatformAdmin(prisma: PrismaClient) {

    const email = "emon@pharmacypms.com"


    const existing = await prisma.user.findFirst({

        where: {
            role: UserRole.SUPER_ADMIN
        }

    })

    if (existing) {
        console.log('⏩ Super Admin already exists. Skipping...');
        return
    }

    const hashedPassword = await bcrypt.hash("admin123", 10)



    await prisma.user.create({

        data: {
            name: "Emon (Platform Admin)",
            email: email,
            passwordHash: hashedPassword,
            role: UserRole.SUPER_ADMIN,
            isActive: true,
        }


    })

    console.log("✅ Super Admin created successfully")
}