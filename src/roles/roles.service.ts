import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatedRoleDTO } from './dto/created-role.dto';
import { Role } from './role.model';

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private roleRepository: typeof Role) { }

    async createRole(dto: CreatedRoleDTO): Promise<Role> {
        const role = await this.roleRepository.create(dto);
        return role;
    }

    async getAll(): Promise<Role[]> {
        const roles = await this.roleRepository.findAll();
        return roles;
    }

    async getAllUsersById(id: number): Promise<Role[]> {
        const roles = await this.roleRepository.findAll({ where: { id } , include: { all: true }});
        return roles;
    }

    async getById(id: number): Promise<Role> | undefined {
        const role = await this.roleRepository.findOne({ where: { id } });
        return role;
    }
}
