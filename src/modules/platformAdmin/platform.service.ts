import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtHelper } from "src/common/jwt.helper";
import { PrismaService } from "src/prisma/prisma.service";
import { LoginDto } from "./dto/login.dto";
import { UserRole } from "@prisma/client";
import * as bcrypt from "bcryptjs";


@Injectable()

export class PlatformService {

    constructor(private prisma: PrismaService,
        private jwtHelper: JwtHelper
    ) { }


    async login(loginDto: LoginDto) {

        const user = await this.prisma.user.findFirst({

            where: {
                email: loginDto.email,

            }
        })

        if(!user || user.role!==UserRole.SUPER_ADMIN){

            throw new UnauthorizedException("platform Admin access only");
        }

        const isValid=await bcrypt.compare(loginDto.password,user.passwordHash);

        if(!isValid){
            throw new UnauthorizedException('Invalid credentials')
        }


        return this.jwtHelper.generateToken({
            sub:user.id,
            email:user.email,
            role:user.role
            
        });


    }
}

