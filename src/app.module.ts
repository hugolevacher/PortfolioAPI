import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { DatabaseService } from './services/database.service';
import { HealthController } from './controllers/health.controller';
import { AuthModule } from './modules/auth.module';
import { SkillModule } from './modules/skill.module';
import { ProjectModule } from './modules/project.module';

@Module({
  imports: [AuthModule, SkillModule, ProjectModule],
  controllers: [AppController, HealthController],
  providers: [AppService, DatabaseService],
})
export class AppModule { }
