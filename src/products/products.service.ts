import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatedProductDTO } from './dto/created-product.dto';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product) private  productRepository: typeof Product) { }

    async createProduct(dto: CreatedProductDTO): Promise<Product> {
        const product =  await this.productRepository.create(dto);
        return product;
    }

    async getAll(): Promise<Product[]> {
        const products = await this.productRepository.findAll({ include: { all: true } });
        return products;
    }

    async getById(id: number): Promise<Product> {
        const product = await this.productRepository.findOne({where : {id}, include: { all: true } });
        return product;
    }
}
