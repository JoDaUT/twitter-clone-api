import { IntersectionType } from '@nestjs/mapped-types';
import { IsEmail, IsStrongPassword, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
export class CreateAuthDto {
  //   @IsEmail()
  //   email: string;
  @IsNotEmpty()
  username: string;

  @IsStrongPassword({ minLength: 4 })
  password: string;
}

export class LoginDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export class SignUpDto extends IntersectionType(CreateAuthDto, CreateUserDto) {
  @IsNotEmpty()
  confirmationPassword: string;
}
