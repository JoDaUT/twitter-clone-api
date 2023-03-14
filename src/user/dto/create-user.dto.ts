import { IsEmail, IsNotEmpty, IsInt } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  username: string;
  @IsEmail()
  email: string;
  @IsInt()
  age: number;
}
