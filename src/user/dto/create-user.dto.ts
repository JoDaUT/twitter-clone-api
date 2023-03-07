import { IsEmail, IsNotEmpty, IsInt } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  name: string;
  @IsEmail()
  email: string;
  @IsInt()
  age: number;
}
