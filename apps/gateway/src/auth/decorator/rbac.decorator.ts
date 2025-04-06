import { Reflector } from '@nestjs/core';

export enum Role {
    ADMIN = 'admin',
    PAID_USER = 'paidUser',
    USER = 'user',
}

export const RBAC = Reflector.createDecorator<Role[]>();
