import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { USER } from 'src/constants/user';
import { RolesService } from 'src/roles/roles.service';
import { CreatedUserDTO } from './dto/created-user.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userRepository: typeof User,
        private roleService: RolesService
    ) { }

    async createUser(dto: CreatedUserDTO, roleId: number): Promise<User> {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getById(roleId);
        await user.$set('roles', [role.id]);
        user.roles = [role];
        return user;
    }

    async getAll(): Promise<User[]> {
        const users = await this.userRepository.findAll({ include: { all: true } });
        return users;
    }

    async getById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id }, include: { all: true } });
        return user;
    }

    async getByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { email }, include: { all: true }  });
        return user;
    }

    // async findOne(username: string): Promise<User> | null {
    //     const user = await this.userRepository.findOne({where: { login }})
    //     return null
    // }
}
