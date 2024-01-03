import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/model/user.entityt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService
      ) {}

    getHello(): string {
        return 'Hello Admin API!';
    }

    getUsers(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async signIn(username: string, password: string) {

        if (!username || !password) {
            throw new UnauthorizedException('Missing arguments');
        }
        
        const user = await this.usersRepository.findOneBy({ username });

        const isMatch = await bcrypt.compare(password, user?.user_password);

        if (!isMatch) {
          throw new UnauthorizedException('Access denied');
        }

        const payload = { sub: user.userid, username: user.username, firstname: user.firstName, lastname: user.lastName, user_role: user.user_role };
        
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
}
