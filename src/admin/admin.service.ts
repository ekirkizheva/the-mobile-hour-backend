import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

    getUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    postProduct(product: Product) {
        return this.productRepository.save(product);
    }
}
