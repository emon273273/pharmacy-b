import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { PlatformService } from "./platform.service";



@Controller('api/platform')
export class PlatformController {


    constructor(private readonly platformService: PlatformService) { }
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginDto) {

        return this.platformService.login(loginDto);



    }
}

