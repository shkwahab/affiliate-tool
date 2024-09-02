import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as dotenv from 'dotenv';

dotenv.config()

@Injectable()
export class ApiKeyAuthGuard implements CanActivate {
    private static readonly API_KEY = process.env.API_KEY;

    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const apiKey = request.headers['api-key'];

        if (apiKey && ApiKeyAuthGuard.API_KEY === apiKey) {
            return true;
        } else {
            throw new UnauthorizedException('UnAuthorized');
        }
    }
}
