import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from './database.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.databaseService.user.findUnique({
            where: { username },
        });

        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(username: string, password: string) {
        const user = await this.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            user: { id: user.id, username: user.username },
        };
    }
}