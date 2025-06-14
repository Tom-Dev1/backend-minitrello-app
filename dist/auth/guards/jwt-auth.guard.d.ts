import { ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
    private configService;
    constructor(configService: ConfigService);
    canActivate(context: ExecutionContext): boolean;
    private extractTokenFromHeader;
}
export {};
