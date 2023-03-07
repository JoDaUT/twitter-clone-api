import {
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { CreateAuthDto, LoginDto, SignUpDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  @HttpCode(200)
  login(@Request() req) {
    return req.user;
  }
  @Post('/logout')
  @HttpCode(200)
  logout() {
    return null;
  }
  @Post('/signup')
  async signup(@Body() signupDto: SignUpDto) {
    const user = await this.userService.findByEmail(signupDto.email);
    if (user) {
      return new BadRequestException('User already exists');
    }
    const userCreated = await this.authService.signup(signupDto);
    return userCreated;
  }
  @Post('validateToken')
  @HttpCode(200)
  validateToken() {
    return null;
  }
}
