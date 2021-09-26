import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatedProductDTO } from './dto/created-product.dto';
import { Product } from './product.model';
import { ProductsService } from './products.service';

@ApiTags('Products table')
@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService) {}

    @ApiOperation({ summary: 'Create product' })
	@ApiResponse({ status: 200, type: Product })
	@Post()
	create(@Body() dto: CreatedProductDTO): Promise<Product> {
		return this.productService.createProduct(dto);
	}

	@ApiOperation({ summary: 'Get all products' })
	@ApiResponse({ status: 200, type: Product })
	@Get()
	getAll(): Promise<Product[]> {
		return this.productService.getAll();
	}

	@ApiOperation({ summary: 'Get product by id' })
	@ApiResponse({ status: 200, type: [Product] })
	@Get('/:id')
	getById(@Param('id') id: number): Promise<Product> {
		return this.productService.getById(id);
	}

}
