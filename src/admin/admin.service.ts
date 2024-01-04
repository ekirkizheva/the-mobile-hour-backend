import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/model/user.entityt';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Product } from 'src/model/product.entity';
import { Feature } from 'src/model/feature.entity';

@Injectable()
export class AdminService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
      ) {}

    getHello(): string {
        return 'Hello Admin API!';
    }

    getUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    postProduct(product: Product) {
        return this.productRepository.save(product);
    }
}
