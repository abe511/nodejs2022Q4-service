import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// export interface UpdatePasswordDto {
export class UpdatePasswordDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @MinLength(8, { message: 'Must be 8 characters or more' })
  @MaxLength(32, { message: 'Too many characters' })
  oldPassword: string; // previous password

  @IsNotEmpty()
  @MinLength(8, { message: 'Must be 8 characters or more' })
  @MaxLength(32, { message: 'Too many characters' })
  newPassword: string; // new password
}
