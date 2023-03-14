import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import { Auth } from './entities/auth.entity';
import { SignUpDto } from './dto/create-auth.dto';
import { UserService } from 'src/user/user.service';

import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
    private jwtService: JwtService,
  ) {}

  async signup(signUpData: SignUpDto) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(signUpData.password, saltOrRounds);
    const authUser = new Auth();
    authUser.email = signUpData.email;
    authUser.hashedPassword = hashedPassword;
    authUser.username = signUpData.username;
    await this.authRepository.save(authUser);
    return this.usersService.create(signUpData);
  }

  async validateUser(username: string, password: string) {
    const user = await this.authRepository.findOneBy({
      username,
    });
    if (!user) {
      return null;
    }
    const { hashedPassword, ...result } = user;

    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (isMatch) {
      return result;
    }
    return null;
  }

  async login(username: string, email: string) {
    const payload = { username, email };
    return this.jwtService.sign(payload);
  }
}
