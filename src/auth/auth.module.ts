import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Auth]), PassportModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
