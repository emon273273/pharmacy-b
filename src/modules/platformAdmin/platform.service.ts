import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtHelper } from 'src/common/jwt.helper';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { PlatformUserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { CreateDto } from './dto/create.dto';

@Injectable()
export class PlatformService {
  constructor(
    private prisma: PrismaService,
    private jwtHelper: JwtHelper,
  ) {}

  // platform login endpoint
  async login(loginDto: LoginDto) {
    const Platformuser = await this.prisma.platformUser.findFirst({
      where: {
        email: loginDto.email,
      },
    });

    if (!Platformuser || Platformuser.role !== PlatformUserRole.SUPER_ADMIN) {
      throw new UnauthorizedException('platform Admin access only');
    }

    const isValid = await bcrypt.compare(
      loginDto.password,
      Platformuser.passwordHash,
    );

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.jwtHelper.generateToken({
      sub: Platformuser.id,
      email: Platformuser.email,
      role: Platformuser.role,
    });
  }


  // platform create endpoint
  async create(createDto: CreateDto) {
    // TODO: Implement tenant creation logic
    return { message: 'Tenant creation endpoint' };
  }
}
