import { v4 as uuid } from 'uuid';
import DB from "src/db/DB";
import User from "src/user/entities/user.entity";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UpdatePasswordDto } from "src/user/dto/update-user.dto";
// import bcrypt from "bcrypt";
// import { Exclude } from 'class-transformer';

export default class userDB extends DB{
    db: User[] = [];

    findAll(): User[] {
        const sanitizedUserDB = this.db.map((user: User) => {
            return this.removeUserPassword(user);
        });
        return sanitizedUserDB;
    }

    findUser(id: string): User | null {
        const idx: number = this.findOne(this.db, id);
        if(idx >= 0) {
            const user = this.db[idx];
            return this.removeUserPassword(user);
        }
        return null;
    };

    createUser(createUserDto: CreateUserDto): User {
        const user: User = {
            id: uuid(),
            login: createUserDto.login,
            password: createUserDto.password,
            version: 1,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
        this.db.push(user);
        return this.removeUserPassword(user);
    }

    updateUser(id: string, data: UpdatePasswordDto): User | number {
        const idx = this.findOne(this.db, id);
        if(idx >= 0) {
            const user = this.db[idx];
            if(user.password !== data.oldPassword) {
                return -1;
            }
            user.password = data.newPassword;
            user.updatedAt = Date.now();
            user.version++;
            return this.removeUserPassword(user);
        }
        return 0;
    };

    removeUser(id: string): boolean {
        const idx = this.findOne(this.db, id);
        if(idx >= 0) {
            this.remove(this.db, id);
            return true;
        }
        return false;
    }

    removeUserPassword(user: User): User {
        const noPasswordUser = { ...user };
        delete noPasswordUser.password;
        return noPasswordUser;
    };
}