import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { USER } from 'src/constants/user';
import { CreatedUserDTO } from 'src/users/dto/created-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth module')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
        
    }

    @Post('/login')
    login(@Body() userDto: CreatedUserDTO) {
        return this.authService.login(userDto);
    }

    @Post('/registration')
    registration(@Body() userDto: CreatedUserDTO) {
        return this.authService.registration(userDto);
    }

    @Post('/registration/admin')
    registrationAdmin(@Body() userDto: CreatedUserDTO) {
        return this.authService.registration(userDto, USER.ADMIN_USER_ROLE_ID);
    }
}
