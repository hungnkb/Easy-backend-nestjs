import { Body, Controller, Get, Post } from '@nestjs/common';
import { loginUserDto } from '../dto/loginUserDto.dto';
import { AuthService } from '../services/auth.service';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post()
    login(@Body() body: loginUserDto) {
        return this.authService.login(body);
    }

}