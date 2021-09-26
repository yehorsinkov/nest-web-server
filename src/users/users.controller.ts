import { Body, Controller, Get, Param, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { USER } from 'src/constants/user';
import { CreatedUserDTO } from './dto/created-user.dto';
import { User } from './user.model';
import { UsersService } from './users.service';

@ApiTags('User table')
@Controller('users')
//@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {

    constructor(
        private userService: UsersService,
        private authService: AuthService,
    ) { }

    @ApiOperation({ summary: 'Create simple user' })
    @ApiResponse({ status: 200, type: User })
    @UseGuards(JwtAuthGuard)
    @Post('/create/user')
    @UseGuards(JwtAuthGuard, RolesGuard)
    create(@Body() userDTO: CreatedUserDTO): Promise<User> {
        return this.userService.createUser(userDTO, USER.DEFAULT_USER_ROLE_ID);
    }

    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, type: [User] })
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(): Promise<User[]> {
        return this.userService.getAll();
    }

    @ApiOperation({ summary: 'Get user by id' })
    @ApiResponse({ status: 200, type: User })
    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    getById(@Param('id') id: number): Promise<User> {
        return this.userService.getById(id);
    }
}
