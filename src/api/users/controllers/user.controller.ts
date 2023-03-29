import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/createUserDto.dto';
import { ValidationPipe } from 'src/validation.pipe';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    readAll(): Promise<any> {
        return this.userService.readAll();
    }

    @Get(':id') 
    read(@Param() params): Promise<any> {
        return this.userService.read(params.id)
    }

    @Post()
    create(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<any> {
        return this.userService.create(createUserDto)
    }

}
