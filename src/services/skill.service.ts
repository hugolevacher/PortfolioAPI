import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { FileService } from './file.service';
import { CreateSkillDto, UpdateSkillDto } from '../dto/skill.dto';

@Injectable()
export class SkillService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly fileService: FileService,
    ) { }

    async getAllSkills() {
        const skills = await this.databaseService.skill.findMany({
            select: {
                id: true,
                name: true,
                order: true,
                file: {
                    select: {
                        filename: true,
                    },
                },
            },
            orderBy: {
                order: 'asc',
            },
        });

        // Transform the response to flatten the filename
        return skills.map(skill => ({
            id: skill.id,
            name: skill.name,
            order: skill.order,
            filename: skill.file?.filename || null,
        }));
    }

    async getSkillById(id: number) {
        const skill = await this.databaseService.skill.findUnique({
            where: { id },
            include: {
                file: true,
            },
        });

        if (!skill) {
            throw new NotFoundException('Skill not found');
        }

        return skill;
    }

    async createSkill(createSkillDto: CreateSkillDto, file?: Express.Multer.File) {
        let fileRecord;

        if (file) {
            fileRecord = await this.fileService.saveFile(file);
        }

        return this.databaseService.skill.create({
            data: {
                name: createSkillDto.name,
                order: createSkillDto.order,
                fileId: fileRecord?.id,
            },
            include: {
                file: true,
            },
        });
    }

    async updateSkill(id: number, updateSkillDto: UpdateSkillDto, file?: Express.Multer.File) {
        const existingSkill = await this.getSkillById(id);

        let fileRecord;

        if (file) {
            // Delete old file if exists
            if (existingSkill.fileId) {
                await this.fileService.deleteFile(existingSkill.fileId);
            }

            // Save new file
            fileRecord = await this.fileService.saveFile(file);
        }

        return this.databaseService.skill.update({
            where: { id },
            data: {
                ...updateSkillDto,
                ...(fileRecord && { fileId: fileRecord.id }),
            },
            include: {
                file: true,
            },
        });
    }

    async deleteSkill(id: number) {
        const skill = await this.getSkillById(id);

        // Delete associated file if exists
        if (skill.fileId) {
            await this.fileService.deleteFile(skill.fileId);
        }

        return this.databaseService.skill.delete({
            where: { id },
        });
    }
}