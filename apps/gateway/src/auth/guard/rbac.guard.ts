import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RBAC, Role } from '../decorator/rbac.decorator';
import { Request } from 'express';

@Injectable()
export class RBACGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const rbacs = this.reflector.get<Role>(RBAC, context.getHandler());
        if (rbacs === undefined || rbacs.length === 0) return true;

        const request = context.switchToHttp().getRequest<Request>();
        const user = request.user;
        if (!user) return false;

        const userRole = user.role;
        return rbacs.includes(userRole);
    }
}
