import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './role.enum';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(" ")[1] ?? [];
    const user = await this.jwtService.verifyAsync(token, { secret: "@nth0ny" })

    // Add the user information to the request object
    request.user = user;

    // Assuming you have a 'role' property in your user object
    return requiredRoles.includes(user.role);
  }
}
