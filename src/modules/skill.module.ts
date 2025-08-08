import { Module } from '@nestjs/common';
import { SkillController } from '../controllers/skill.controller';
import { SkillService } from '../services/skill.service';
import { FileService } from '../services/file.service';
import { DatabaseService } from '../services/database.service';
import { FileController } from 'src/controllers/file.controller';

@Module({
    controllers: [SkillController, FileController],
    providers: [SkillService, FileService, DatabaseService],
})
export class SkillModule { }