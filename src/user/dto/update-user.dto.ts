import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}


export interface UpdatePasswordDto {
    oldPassword: string; // previous password
    newPassword: string; // new password
}