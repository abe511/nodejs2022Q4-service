import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
// import { Equals } from 'class-validator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  save(createUserDto: CreateUserDto): Promise<User> {
  //   const user: User = {
  //     id: uuid(),
  //     login: createUserDto.login,
  //     password: createUserDto.password,
  //     version: 1,
  //     createdAt: Date.now(),
  //     updatedAt: Date.now(),
  // };
    return this.userRepository.save(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOneBy({id});
  }

  update(id: string, data: UpdatePasswordDto): Promise<any> {
    return this.userRepository.update(id, data);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

}





// import { AppDataSource } from "src/data-source";


// AppDataSource.initialize().then(async () => {

//   console.log("Inserting a new user into the database...")
//   const user = new User();
//   user.login = "testlogin";
//   user.password = "testpassword";
//   user.version = 1;
//   user.createdAt = Date.now();
//   user.updatedAt = Date.now();
//   await AppDataSource.manager.save(user);
//   console.log("Saved a new user with id: " + user.id)

//   console.log("Loading users from the database...")
//   const users = await AppDataSource.manager.find(User)
//   console.log("Loaded users: ", users)

//   console.log("Here you can setup and run express / fastify / any other framework.")

// }).catch(error => console.log(error));



// @Injectable()
// export class UserService {

//   db = new userDB();

//   create(createUserDto: CreateUserDto): User {
//     return this.db.createUser(createUserDto);
//   }

//   findAll(): User[] {
//     return this.db.findAll();
//   }

//   findOne(id: string): User {
//     return this.db.findUser(id);
//   }

//   update(id: string, updatePasswordDto: UpdatePasswordDto): User | number{
//     return this.db.updateUser(id, updatePasswordDto);
//   }

//   remove(id: string): boolean {
//     return this.db.removeUser(id);
//   }
// }
