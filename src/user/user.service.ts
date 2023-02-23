import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
// import { Equals } from "class-validator";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { config } from 'dotenv';
config();

@Injectable()
export class UserService {
  salt: number = parseInt(process.env.CRYPT_SALT);
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async save(createUserDto: CreateUserDto): Promise<User> {
    const { login, password } = createUserDto;
    const passwordHash = await bcrypt.hash(password, this.salt);
    return this.userRepository.save({ login, password: passwordHash });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User Not Found');
    return user;
  }

  async update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UpdateResult> {
    const { oldPassword, newPassword } = updatePasswordDto;
    const newPasswordHash = await bcrypt.hash(newPassword, this.salt);
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException('User Not Found');

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) throw new ForbiddenException('Wrong Password');

    return await this.userRepository.update(id, { password: newPasswordHash });
  }

  async remove(id: string): Promise<void> {
    const user = await this.userRepository.delete(id);
    if (!user.affected) throw new NotFoundException('User Not Found');
  }
}
