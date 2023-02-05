import { Body, Controller, Get, Post, Put, Delete, Header, Param, HttpCode} from "@nestjs/common";
import { UserService } from "src/services/user/user.service";
import User from "src/entities/user.entity";
import CreateUserDto from "src/dtos/create-user.dto";
import UpdatePasswordDto from "src/dtos/update-password.dto";


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @Header("Content-Type", "application/json")
    getUsers(): User[] {
        return this.userService.findUsers();
    }

    @Get(":id")
    @Header("Content-Type", "application/json")
    getUser(@Param("id") id: string): User {
        return this.userService.findUser(id);
    }

    @Post()
    addUser(@Body() user: CreateUserDto): User {
        // if(!user.login || !user.password) {
        //     throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
        // }
        const newUser = this.userService.createUser(user);
        return newUser;
    }

    @Put(":id")
    updateUser(@Param("id") id: string, @Body() password: UpdatePasswordDto): User {
        return this.userService.updatePassword(id, password.oldPassword, password.newPassword);
    }

    @Delete(":id")
    @HttpCode(204)
    deleteUser(@Param("id") id: string): void {
        this.userService.removeUser(id);
    }

}
