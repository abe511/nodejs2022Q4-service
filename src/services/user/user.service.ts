import { Injectable } from '@nestjs/common';
import { findRecord, comparePassword, removeRecord, checkCredentials} from 'src/utils/requestHandler.util';
import { v4 as uuid } from "uuid";
import User from "src/entities/user.entity";
import userDB from "src/dbs/userDB";
import CreateUserDto from 'src/dtos/create-user.dto';


@Injectable()
export class UserService {

    findUsers(): User[] {
        const modifiedUserDB = userDB.map((user: User) => {
            return this.removeUserPassword(user);
        });
        return modifiedUserDB;
    }

    findUser(id: string): User {
        const idx = findRecord(userDB, id);
        return this.removeUserPassword(userDB[idx]);
    }

    createUser(credentials: CreateUserDto): User {
        checkCredentials(credentials.login, credentials.password);
        const user: User = {
            id: uuid(),
            login: credentials.login,
            password: credentials.password,
            version: 1,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        userDB.push(user);
        return this.removeUserPassword(user);

    }

    updatePassword(id: string, oldPassword: string, newPassword: string): User {
        const idx = findRecord(userDB, id);
        comparePassword(userDB[idx].password, oldPassword);
        userDB[idx].password = newPassword;
        userDB[idx].updatedAt = Date.now();
        userDB[idx].version++;
        return this.removeUserPassword(userDB[idx]);
    }

    removeUser(id: string) {
        removeRecord(userDB, id);
    }

    removeUserPassword = (user: User): User => {
        const noPasswordUser = {...user};
        delete(noPasswordUser.password);
        return noPasswordUser;
    }
}
