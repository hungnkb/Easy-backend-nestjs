import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/createUserDto.dto';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<IUser>
  ) { }

  async create(body: CreateUserDto): Promise<IUser | any> {
    let {username, password, email, role} = body;
    console.log(body);
    
    
  }

  async readAll(): Promise<any> {
    let userList = await this.userModel.find();
    return userList;
  }

  async read(id: string): Promise<any> {
    let user = await this.userModel.findOne({ _id: id });
    if (user) {
      return { message: 'success', data: user }
    } else {

    }
  }
}
