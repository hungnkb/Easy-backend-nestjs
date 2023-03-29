import { Inject, Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/createUserDto.dto';
import { IUser } from '../interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<IUser>
  ) { }

  async create(body: CreateUserDto): Promise<IUser | any> {
    let { username, password, email, role } = body;

    let isUsernameExist = await this.userModel.findOne({ username })
    let isEmailExist = await this.userModel.findOne({ email })
    if (isUsernameExist) {
      if (isEmailExist) {
        throw new BadRequestException('Username and email already exists')
      }
      throw new BadRequestException('Username already exists')
    } else if (isEmailExist) {
      throw new BadRequestException('Email already exists')
    }

    let hashPassword = await this.hashPassword(password);
    console.log(hashPassword);
    
    let newUser = await this.userModel.create({username, password: hashPassword, email, role});
    
    if (newUser) {
      return newUser;
    } else {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST)
    }
  }

  async readAll(): Promise<any> {
    let userList = await this.userModel.find();
    return userList;
  }

  async read(id: string): Promise<any> {
    let user = await this.userModel.findOne({ _id: id });
    if (user) {
      return { message: 'success', user }
    } else {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST)
    }
  }

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash
  }
}
