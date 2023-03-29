import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiModule } from './api/modules/api.module';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from './api/auth/modules/auth.module';
import { UserModule } from './api/users/modules/user.module';

const configService = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(configService.get('DB_HOST')),
    ApiModule,
    RouterModule.register([{
      path: 'api',
      module: ApiModule,
      children: [
        {
          path: 'users',
          module: UserModule
        },
        {
          path: 'auth',
          module: AuthModule
        }
      ]
    }]),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
