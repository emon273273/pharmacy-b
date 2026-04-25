import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";



export interface TokenPayload {
    sub: string,
    email: string,
    role: string
}

@Injectable()

export class JwtHelper {

    constructor(private readonly jwtService: JwtService) {


    }

    generateToken(payload: TokenPayload) {

        return {

            accessToken: this.jwtService.sign(payload),
            expiresIn: "1d",


        }
    }
}