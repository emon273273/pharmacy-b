import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { SeedService } from './seed/seed.service';
import { PlatformModule } from './modules/platformAdmin/platform.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }),
PrismaModule,
PlatformModule
],
  controllers: [AppController],
  providers: [AppService,SeedService],
})
export class AppModule {}
