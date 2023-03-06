import {
  IsNotEmpty,
  IsAlphanumeric,
  MinLength,
  MaxLength,
} from 'class-validator';

// export interface CreateUserDto {
export class CreateUserDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(3, { message: 'Must be 3 characters or more' })
  @MaxLength(32, { message: 'Too many characters' })
  // @Length(3, 32)
  login: string;

  // @IsAlphanumeric()
  // @IsStrongPassword()
  @IsNotEmpty()
  @MinLength(8, { message: 'Must be 8 characters or more' })
  @MaxLength(32, { message: 'Too many characters' })
  // @Length(8, 32)
  password: string;
}

function IsStrongPassword() {
  throw new Error('Function not implemented.');
}
