import { Module } from '@nestjs/common';
import { ProjectController } from '../controllers/project.controller';
import { ProjectService } from '../services/project.service';
import { FileService } from '../services/file.service';
import { DatabaseService } from '../services/database.service';

@Module({
    controllers: [ProjectController],
    providers: [ProjectService, FileService, DatabaseService],
})
export class ProjectModule { }