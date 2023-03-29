import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IUser } from "../interfaces/user.interface";

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel('IUser')
    private readonly userModel: Model<IUser>
  ) {
    // super(userModel);
  }
}