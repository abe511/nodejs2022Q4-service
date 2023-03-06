import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

import { CustomLoggerService } from "src/custom-logger/custom-logger.service";

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { UserModule } from './user.module';

@Controller('user')
export class UserController {

  private readonly logger = new CustomLoggerService(UserModule.name);

  constructor(private readonly userService: UserService) {}
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    this.logger.log("Creating a new User")
    if (!createUserDto.login || !createUserDto.password) {
      this.logger.error("User creation failed");
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    this.logger.log("User created")
    return this.userService.save(createUserDto);
  }

  @Get()
  findAll() {
    this.logger.log("Querying all users");
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const user = this.userService.findOne(id);
    this.logger.log(`Querying user with id: ${id}`);
    if (!user) {
      this.logger.error("User not found");
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateUserDto: UpdatePasswordDto,
  ) {
    this.logger.log(`Modifying user with id: ${id}`);
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.logger.log(`Removing user with id: ${id}`);
    if (!this.userService.remove(id)) {
      this.logger.error("User not found");
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
