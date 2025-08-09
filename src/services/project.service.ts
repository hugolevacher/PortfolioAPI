import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { FileService } from './file.service';
import { CreateProjectDto, UpdateProjectDto } from '../dto/project.dto';

@Injectable()
export class ProjectService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly fileService: FileService,
    ) { }

    async getAllProjects(language: 'fr' | 'en') {
        const projects = await this.databaseService.project.findMany({
            select: {
                id: true,
                order: true,
                titleFr: true,
                titleEn: true,
                descriptionFr: true,
                descriptionEn: true,
                image: {
                    select: {
                        filename: true,
                    },
                },
            },
            orderBy: {
                order: 'asc',
            },
        });

        return projects.map(project => ({
            id: project.id,
            order: project.order,
            title: language === 'fr' ? project.titleFr : project.titleEn,
            description: language === 'fr' ? project.descriptionFr : project.descriptionEn,
            image: project.image?.filename || null,
        }));
    }

    async getProjectById(id: number, language: 'fr' | 'en') {
        const project = await this.databaseService.project.findUnique({
            where: { id },
            include: {
                image: true,
                video: true,
            },
        });

        if (!project) {
            throw new NotFoundException('Project not found');
        }

        return {
            id: project.id,
            title: language === 'fr' ? project.titleFr : project.titleEn,
            text: language === 'fr' ? project.textFr : project.textEn,
            projectUrl: project.projectUrl,
            githubUrl: project.githubUrl,
            image: project.image?.filename || null,
            video: project.video?.filename || null,
        };
    }

    async createProject(
        createProjectDto: CreateProjectDto,
        imageFile?: Express.Multer.File,
        videoFile?: Express.Multer.File,
    ) {
        let imageRecord;
        let videoRecord;

        if (imageFile) {
            imageRecord = await this.fileService.saveFile(imageFile);
        }

        if (videoFile) {
            videoRecord = await this.fileService.saveFile(videoFile);
        }

        return this.databaseService.project.create({
            data: {
                ...createProjectDto,
                imageId: imageRecord?.id,
                videoId: videoRecord?.id,
            },
            include: {
                image: true,
                video: true,
            },
        });
    }

    async updateProject(
        id: number,
        updateProjectDto: UpdateProjectDto,
        imageFile?: Express.Multer.File,
        videoFile?: Express.Multer.File,
    ) {
        const existingProject = await this.databaseService.project.findUnique({
            where: { id },
        });

        if (!existingProject) {
            throw new NotFoundException('Project not found');
        }

        let imageRecord;
        let videoRecord;

        if (imageFile) {
            // Delete old image if exists
            if (existingProject.imageId) {
                await this.fileService.deleteFile(existingProject.imageId);
            }
            imageRecord = await this.fileService.saveFile(imageFile);
        }

        if (videoFile) {
            // Delete old video if exists
            if (existingProject.videoId) {
                await this.fileService.deleteFile(existingProject.videoId);
            }
            videoRecord = await this.fileService.saveFile(videoFile);
        }

        return this.databaseService.project.update({
            where: { id },
            data: {
                ...updateProjectDto,
                ...(imageRecord && { imageId: imageRecord.id }),
                ...(videoRecord && { videoId: videoRecord.id }),
            },
            include: {
                image: true,
                video: true,
            },
        });
    }

    async deleteProject(id: number) {
        const project = await this.databaseService.project.findUnique({
            where: { id },
        });

        if (!project) {
            throw new NotFoundException('Project not found');
        }

        // Delete associated files if they exist
        if (project.imageId) {
            await this.fileService.deleteFile(project.imageId);
        }

        if (project.videoId) {
            await this.fileService.deleteFile(project.videoId);
        }

        return this.databaseService.project.delete({
            where: { id },
        });
    }
}