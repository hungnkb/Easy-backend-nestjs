import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { UserModule } from 'src/api/users/modules/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constants/constants';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from 'src/api/users/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserProvider } from 'src/api/users/services/user.provider';
import { databaseProviders } from 'src/database/services/database.providers';
require("dotenv").config();

const EXPIRES_IN = process.env.EXPIRES_IN

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            secret: jwtConstants.secretOrPrivateKey,
            signOptions: { expiresIn: EXPIRES_IN },
        })
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        UserService,
        JwtService,
        ...UserProvider,
        ...databaseProviders,
    ],
})
export class AuthModule { }
