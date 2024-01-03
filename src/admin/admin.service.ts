import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/model/user.entityt';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
      ) {}

    getHello(): string {
        return 'Hello Admin API!';
    }

    getUsers(): Promise<User[]> {
        return this.usersRepository.find();
    }
}
