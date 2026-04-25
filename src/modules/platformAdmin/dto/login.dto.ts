
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
    
@IsEmail({},{message:"please provide a valid email address"})
email:string;

@IsString()
@MinLength(6,{message:"Password must be at least 6 character long"})
password:string;

}