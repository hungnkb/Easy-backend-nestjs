import { Get, Injectable } from '@nestjs/common';


@Injectable()
export class AuthService {
    getHello(): string {
        return 'AuthService Get';
    }
}
