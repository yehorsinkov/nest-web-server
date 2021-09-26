import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/roles/role.model';
import { RolesModule } from 'src/roles/roles.module';
import { User } from 'src/users/user.model';
import { UsersModule } from 'src/users/users.module';
import { UserRoles } from './user-roles.model';

@Module({
    imports: [
        SequelizeModule.forFeature([Role, User, UserRoles]),
        UsersModule,
        RolesModule,
    ],
})
export class UserRolesModule { }
