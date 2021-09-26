import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { USER } from "src/constants/notifications";
import { ROLES_KEY } from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private jwtService: JwtService, private reflector: Reflector) { }
	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		try {
			const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
				context.getHandler,
				context.getClass,
			]);
			if (!requiredRoles) {
				console.log('HERE');
				return true;
			}
			const req = context.switchToHttp().getRequest();
			const authHeader = req.headers.authorization;
			const bearer = authHeader.split(" ")[0];
			const token = authHeader.split(" ")[1];
			if (bearer !== "Bearer" || !token) {
				throw new UnauthorizedException({ message: USER.NOT_AUTHORIZED });
			}
			const user = this.jwtService.verify(token);
			req.user = user;
			return user.roles.some((role) => requiredRoles.include(role.value));
		} catch (error) {
			console.log("error", error);
			// throw new UnauthorizedException({message: USER.NOT_AUTHORIZED});
			return Promise.resolve(false);
		}
	}
}
