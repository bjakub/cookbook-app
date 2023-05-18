import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dtos/CreateUserDto';

export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userModel.find({});
  }

  async getUserById(id: string): Promise<User | null> {
    return await this.userModel.findById(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email });
  }

  async create(user: CreateUserDto) {
    const newUser = new this.userModel(user);
    const savedUser = await newUser.save();
    return savedUser;
  }
}
