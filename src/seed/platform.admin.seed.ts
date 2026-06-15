import { PrismaClient, PlatformUserRole } from '@prisma/client';

import * as bcrypt from 'bcryptjs';


export async function seedPlatformAdmin(prisma: PrismaClient) {
  const email = 'emon@gmail.com';

  const existing = await prisma.platformUser.findFirst({
    where: {
      role: PlatformUserRole.SUPER_ADMIN,
    },
  });

  if (existing) {
    console.log('⏩ Super Admin already exists. Skipping...');
    return;
  }

  const hashedPassword = await bcrypt.hash('admin123', 10);

  await prisma.platformUser.create({
    data: {
      name: 'Emon (Platform Admin)',
      email: email,
      passwordHash: hashedPassword,
      role: PlatformUserRole.SUPER_ADMIN,
      isActive: true,
    },
  });

  console.log('✅ Super Admin created successfully');
}
