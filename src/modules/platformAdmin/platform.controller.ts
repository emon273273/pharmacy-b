import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PlatformService } from './platform.service';
import { CreateDto } from './dto/create.dto';
import { ApiResponse } from 'src/common/dto/response.dto';

@Controller('api/platform')
export class PlatformController {
  constructor(private readonly platformService: PlatformService) {}
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const result = await this.platformService.login(loginDto);
    return new ApiResponse('Login successful', result);
  }

  // create a new tenant (branch )
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateDto) {
    const result = await this.platformService.create(createDto);
    return new ApiResponse('Tenant created successfully', result);
  }
}
