// src/modules/platformAdmin/platform.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtHelper } from 'src/common/jwt.helper';
import { PrismaService } from 'src/prisma/prisma.service';
import { PlatformController } from './platform.controller';
import { PlatformService } from './platform.service';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';
import { PlatformAdminGuard } from 'src/common/guards/platform-admin.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        // We define the object here and cast the whole thing to any
        // to bypass the strict StringValue check on expiresIn
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string>('JWT_EXPIRES_IN') || '1d',
          },
        } as any;
      },
    }),
  ],
  providers: [
    JwtHelper,
    PrismaService,
    PlatformService,
    JwtStrategy,
    PlatformAdminGuard,
  ],
  controllers: [PlatformController],
})
export class PlatformModule {}
