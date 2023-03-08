import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OmitType, PickType } from '@nestjs/mapped-types';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/create-auth.dto';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
    private jwtService: JwtService,
  ) {}

  async signup(signUpData: SignUpDto) {
    const authUser = new Auth();
    authUser.email = signUpData.email;
    authUser.hashedPassword = signUpData.password;
    authUser.username = signUpData.username;
    await this.authRepository.save(authUser);
    return this.usersService.create(signUpData);
  }

  async validateUser(username: string, password: string) {
    const user = await this.authRepository.findOneBy({
      username,
      hashedPassword: password,
    });
    if (user) {
      const { hashedPassword, ...result } = user;
      return result;
    }
    return null;
  }

  async login(username: string, email: string) {
    const payload = { username, email };
    return this.jwtService.sign(payload);
  }
}
