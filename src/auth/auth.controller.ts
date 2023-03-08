import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Request,
  BadRequestException,
  Get,
} from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/create-auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @HttpCode(200)
  login(@Request() req) {
    console.log({ user: req.user });
    const user: User = req.user;
    return this.authService.login(user.username, user.email);
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

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
