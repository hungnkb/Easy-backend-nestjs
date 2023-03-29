import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserProvider } from '../services/user.provider';
import { UserService } from '../services/user.service';
import { DatabaseModule } from 'src/database/modules/database.module';
import { databaseProviders } from 'src/database/services/database.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [
        UserService, 
        ...UserProvider,
        ...databaseProviders,
    ]
})
export class UserModule { }
