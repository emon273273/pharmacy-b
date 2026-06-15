import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  subDomain: string;

  @IsString()
  @IsOptional()
  tradeLicense?: string;

  @IsString()
  @IsOptional()
  dgdaLicense?: string;

    @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  address?: string;

   @IsUrl()
  @IsOptional()
  logoUrl?: string;
}
