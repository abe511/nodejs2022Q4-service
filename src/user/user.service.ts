import { Injectable } from '@nestjs/common';
import { v4 as uuid } from "uuid";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import User from "./entities/user.entity";


import userDB from "./db/userDB";
import { checkCredentials, findRecord, removeRecord, comparePassword } from "./requestHandler.util";


@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto): User {
    checkCredentials(createUserDto.login, createUserDto.password);
    const user: User = {
        id: uuid(),
        login: createUserDto.login,
        password: createUserDto.password,
        version: 1,
        createdAt: Date.now(),
        updatedAt: Date.now()
    }
    userDB.push(user);
    return this.removeUserPassword(user);
  }

  findAll(): User[] {
    const modifiedUserDB = userDB.map((user: User) => {
      return this.removeUserPassword(user);
    });
    return modifiedUserDB;
  }

  findOne(id: string): User {
    const idx = findRecord(userDB, id);
    return this.removeUserPassword(userDB[idx]);
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto): User {
    const idx = findRecord(userDB, id);
    comparePassword(userDB[idx].password, updatePasswordDto.oldPassword);
    userDB[idx].password = updatePasswordDto.newPassword;
    userDB[idx].updatedAt = Date.now();
    userDB[idx].version++;
    return this.removeUserPassword(userDB[idx]);
  }

  updatePassword(id: string, oldPassword: string, newPassword: string): User {
    const idx = findRecord(userDB, id);
    comparePassword(userDB[idx].password, oldPassword);
    userDB[idx].password = newPassword;
    userDB[idx].updatedAt = Date.now();
    userDB[idx].version++;
    return this.removeUserPassword(userDB[idx]);
  }


  remove(id: string) {
    removeRecord(userDB, id);
  }

  removeUserPassword = (user: User): User => {
    const noPasswordUser = {...user};
    delete(noPasswordUser.password);
    return noPasswordUser;
  }


}
