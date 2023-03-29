import { BadRequestException, Get, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { IUser } from 'src/api/users/interfaces/user.interface';
import { loginUserDto } from '../dto/loginUserDto.dto';
import { UserService } from 'src/api/users/services/user.service';
import { ConfigService } from '@nestjs/config';
import { log } from 'console';

@Injectable()
export class AuthService {
    constructor(
        @Inject('USER_MODEL')
        private userModel: Model<IUser>,
        private usersService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async login(body: loginUserDto) {
        let { username, password } = body;
        let user = this.userModel.findOne({ username, password });
        if (user) {
            const token = await this.jwtService.signAsync({ username }, { expiresIn: this.configService.get('EXPIRES_IN'), secret: this.configService.get('JWT_SECRET') })
            return token
        } else {
            throw new BadRequestException('Wrong username or password')
        }
    }
}
