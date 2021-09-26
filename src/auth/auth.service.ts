import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatedUserDTO } from 'src/users/dto/created-user.dto';
import { User } from 'src/users/user.model';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bccrypt from 'bcryptjs'
import { ConfigService } from '@nestjs/config';
import { USER } from 'src/constants/user';

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) {}

    async login(userDto: CreatedUserDTO) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    async registration(userDto: CreatedUserDTO, roleId = USER.DEFAULT_USER_ROLE_ID) {
        const candidate = await this.userService.getByEmail(userDto.email);
        if (candidate) {
            // throw new HttpException('Пользователь уже создан!', HttpStatus.BAD_REQUEST);
            //вернем FALSE для отображения на клиенте ошибки
            return false;
        }
        const hashPassword = await bccrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password: hashPassword }, roleId);
        return await this.generateToken(user);
    }

    private async generateToken(user: User) {
        const payload = { email: user.email, id: user.id, roles: user.roles }
        return {
            token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                roles: user.roles,
            }
        }
    }

    // public getCookieWithJwtAccessToken(userId: number) {
    //     const payload = { userId };
    //     const token = this.jwtService.sign(payload, {
    //       secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
    //       expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`
    //     });
    //     return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}`;
    // }

    private async validateUser(userDto: CreatedUserDTO): Promise<User> | null {
        console.log('userDto.email',userDto.email);
        const user = await this.userService.getByEmail(userDto.email);
        const isPassEqual = await bccrypt.compare(userDto.password, user.password)
        if (user && isPassEqual) {
            return user;
        }
        // throw new UnauthorizedException({message: 'Incorrect email or password!'})
    }
}
