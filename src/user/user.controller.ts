import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpException,
  HttpStatus,
  // Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const user = this.userService.findByEmail(createUserDto.email);
    if (user) {
      return new HttpException(
        'User with that email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.userService.create(createUserDto);
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }

  @Post('/follow/:id')
  @HttpCode(200)
  follow(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id);
    this.userService.follow(id);
    return;
  }
}
