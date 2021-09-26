import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatedRoleDTO } from './dto/created-role.dto';
import { Role } from './role.model';
import { RolesService } from './roles.service';

@ApiTags('Roles table')
@Controller('roles')
export class RolesController {
	constructor(private roleService: RolesService) { }

	@ApiOperation({ summary: 'Create role' })
	@ApiResponse({ status: 200, type: Role })
	@Post()
	create(@Body() userDTO: CreatedRoleDTO): Promise<Role> {
		return this.roleService.createRole(userDTO);
	}

	@ApiOperation({ summary: 'Get all roles' })
	@ApiResponse({ status: 200, type: [Role] })
	@Get()
	@UseGuards(JwtAuthGuard)
	getAll(): Promise<Role[]> {
		return this.roleService.getAll();
	}

	@ApiOperation({ summary: 'Get role by id' })
	@ApiResponse({ status: 200, type: Role })
	@Get('/:id')
	getById(@Param('id') id: number): Promise<Role> {
		return this.roleService.getById(id);
	}

	@ApiOperation({ summary: 'Get all users by id' })
	@ApiResponse({ status: 200, type: [Role] })
	@Get('/:id/users')
	getAllUsersById(@Param('id') id: number): Promise<Role[]> {
		return this.roleService.getAllUsersById(id);
	}
}
