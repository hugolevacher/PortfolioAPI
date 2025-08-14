import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { IsString } from 'class-validator';

export class LoginDto {
    @IsString()
    username: string;

    @IsString()
    password: string;
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginDto) {
        console.log('Login attempt:', loginDto);
        return this.authService.login(loginDto.username, loginDto.password);
    }
}