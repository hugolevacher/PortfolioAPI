import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { DatabaseService } from '../services/database.service';
import { JwtStrategy } from 'src/jwt/jwt.strategy';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'your-secret-key',
            signOptions: { expiresIn: '24h' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, DatabaseService],
    exports: [AuthService],
})
export class AuthModule { }