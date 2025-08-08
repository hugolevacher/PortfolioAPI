import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from 'src/services/database.service';

@Controller('health')
export class HealthController {
    constructor(private readonly databaseService: DatabaseService) { }

    @Get()
    getHealth() {
        return { status: 'API is working!', timestamp: new Date().toISOString() };
    }

    @Get('db')
    async getDbHealth() {
        try {
            await this.databaseService.$queryRaw`SELECT 1`;
            return { status: 'Database connected!', timestamp: new Date().toISOString() };
        } catch (error) {
            return { status: 'Database connection failed', error: error.message };
        }
    }
}