import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Product } from 'src/model/product.entity';
import { User } from 'src/model/user.entityt';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
      ) {}

    getUser(id:number): Promise<User[]> {
        return this.userRepository.findBy({id});
    }

    getUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    async putUser(id: number, user: User) {
        const updateUser = {...user};
        if (user.user_password) {
            updateUser.user_password = await bcrypt.hash(user.user_password, 10); 
        } else if ('user_password' in updateUser) {
            delete updateUser.user_password;
        }
        return await this.userRepository.update({id}, updateUser);
    }

    async postUser(user: User) {
        const user_password = await bcrypt.hash(user.user_password, 10); 
        return await this.userRepository.insert({...user,user_password });
    }

    async deleteUser(id: number) {
        if (id === 1) { 
            throw new ForbiddenException('Cannot delete admin user');
        } else {
            return await this.userRepository.delete({id});
        }
    }

    postProduct(product: Product) {
        return this.productRepository.save(product);
    }
}
