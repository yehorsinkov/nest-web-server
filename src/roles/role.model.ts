import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { UserRoles } from 'src/user-roles/user-roles.model';
import { User } from 'src/users/user.model';

export interface RoleCreationAttrs {
    title: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {

    @ApiProperty({ example: '1', description: 'Unique user role ID' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'ADMINISTRATOR', description: 'User role state' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    title: string;

    @BelongsToMany(() => User, () => UserRoles)
    users: User[];
}
