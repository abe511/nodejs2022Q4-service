import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
// import { Equals } from 'class-validator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import User from './entities/user.entity';
import userDB from "./db/userDB";


@Injectable()
export class UserService {

  db = new userDB();

  create(createUserDto: CreateUserDto): User {
    return this.db.createUser(createUserDto);
  }

  findAll(): User[] {
    return this.db.findAll();
  }

  findOne(id: string): User {
    return this.db.findUser(id);
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto): User | number{
    return this.db.updateUser(id, updatePasswordDto);
  }

  remove(id: string): boolean {
    return this.db.removeUser(id);
  }
}
