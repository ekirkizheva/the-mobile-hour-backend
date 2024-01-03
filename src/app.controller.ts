import { Controller, Get, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppService } from './app.service';
import { User } from './model/user.entityt';
import * as bcrypt from 'bcrypt';


@Controller()
export class AppController {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly appService: AppService
  ) {}


  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('seed')
  async postSeedData() {
    const hashedPassword = await bcrypt.hash('password', 10);
    await this.usersRepository.insert({
      username: 'admin',
      user_password: hashedPassword,
      firstName: 'Admin',
      lastName: '',
      user_role: 'admin',
    });
    return 'Success';
  }

}
