import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from '@nestjs/jwt';
import { USER } from "src/constants/notifications";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {
        
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();      
        try {
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
            console.log('TOKEEEEEEEEEN', token);
                      
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: USER.NOT_AUTHORIZED});
            }
            const user = this.jwtService.verify(token);
            req.user = user;
            return true;
        } catch (error) {
            console.log('error11111123123123123123123131231212', error);
            // throw new UnauthorizedException({message: USER.NOT_AUTHORIZED});
            return Promise.resolve(false);
        }
    }
}