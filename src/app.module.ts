import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { DatabaseService } from './services/database.service';
import { HealthController } from './controllers/health.controller';

@Module({
  imports: [],
  controllers: [AppController, HealthController],
  providers: [AppService, DatabaseService],
})
export class AppModule { }
