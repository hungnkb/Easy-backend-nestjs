import { ConfigService } from '@nestjs/config';
require("dotenv").config();

const configService = new ConfigService();
const SECRET_KEY = process.env.JWT_SECRET;

export const jwtConstants = {
    secretOrPrivateKey: SECRET_KEY
};