import { ApiProperty } from "@nestjs/swagger";

export class CreatedProductDTO {
    @ApiProperty({ example: 3000, description: 'Product price' })
    readonly price: number;

    @ApiProperty({ example: 'T - Shirt ADBG', description: 'Product title' })
    readonly title: string;

    @ApiProperty({ example: 'M', description: 'Product size' })
    readonly size: string;

    @ApiProperty({ example: 'This is the best T-Shirt ever', description: 'Product description' })
    readonly description: string;

    @ApiProperty({ example: 'https://images.ua.prom.st/1757163622_muzhskaya-futbolka-legkaya.jpg', description: 'Product icon url' })
    readonly icon: string;


}