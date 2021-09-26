import { ApiProperty } from "@nestjs/swagger";
import { Model } from "sequelize";
import { BelongsToMany, Column, DataType, Table } from "sequelize-typescript";
import { User } from "src/users/user.model";

export interface ProductCreationsAttrs {
    price: number;
    title: string;
    description: string;
    icon: string;
    size: string;
}

@Table({ tableName: 'products' })
export class Product extends Model<Product, ProductCreationsAttrs> {
    
    @ApiProperty({ example: 1, description: 'Product unique ID' })
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({ example: 3000, description: 'Product price' })
    @Column({type: DataType.INTEGER, allowNull: false})
    price: number;

    @ApiProperty({ example: 'M', description: 'Product size' })
    @Column({type: DataType.STRING, allowNull: false})
    size: string;

    @ApiProperty({ example: 'T - Shirt ADBG', description: 'Product title' })
    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @ApiProperty({ example: 'This is the best T-Shirt ever', description: 'Product description' })
    @Column({type: DataType.STRING, defaultValue: 'Description'})
    description: string;

    @ApiProperty({ example: 'https://images.ua.prom.st/1757163622_muzhskaya-futbolka-legkaya.jpg', description: 'Product icon url' })
    @Column({type: DataType.STRING, defaultValue: 'Sorry, icon is empty'})
    icon: string;
}
