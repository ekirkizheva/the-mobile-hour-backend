import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/model/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PublicService {

    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ){}

    getHello(): string {
        return 'Hello Public API!';
    }

    getProduct(id: number): Promise<Product[]> {
        return this.productRepository.find({
            relations: ['features'],
            where: { id }
        });
    }

    getProducts(): Promise<Product[]> {
        return this.productRepository.find({
            relations: ['features'],
        });
    }
    
}
