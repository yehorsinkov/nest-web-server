import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Product } from 'src/products/product.model';
import { Role } from 'src/roles/role.model';
import { UserRoles } from 'src/user-roles/user-roles.model';

export interface UserCreationAttrs {
    email: string;
    password?: string;
    name: string;
    family_name: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {

    @ApiProperty({ example: '1', description: 'User unique ID' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'test@gmail.com', description: 'Account email/login' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @ApiProperty({ example: 'qwerty123', description: 'Account password' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @ApiProperty({ example: 'John', description: 'User name' })
    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @ApiProperty({ example: 'Smith', description: 'User family name' })
    @Column({ type: DataType.STRING, allowNull: false })
    family_name: string;

    @ApiProperty({ example: 'false', description: 'User banned status' })
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    isBanned?: boolean;

    @BelongsToMany(() => Role, () => UserRoles)
    roles?: Role[];
}