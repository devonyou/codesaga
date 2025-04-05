import { Reflector } from '@nestjs/core';

export enum Role {
    admin = 'admin',
    paidUser = 'paidUser',
    user = 'user',
}

export const RBAC = Reflector.createDecorator<Role[]>();
