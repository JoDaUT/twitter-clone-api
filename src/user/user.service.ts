import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    this.usersRepository.save(createUserDto);
    return createUserDto;
  }

  // findAll() {
  //   const hello = this.configService.get<string>('HOLA');
  //   console.log(hello);
  //   return `This action returns all user`;
  // }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    return user;
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }

  async follow(id: number) {
    console.log(id);
  }
}
