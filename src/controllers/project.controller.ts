import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
    UseGuards,
    UseInterceptors,
    UploadedFiles,
    ParseIntPipe,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProjectService } from '../services/project.service';
import { JwtAuthGuard } from '../jwt/jwt.auth.guard';
import { CreateProjectDto, UpdateProjectDto } from '../dto/project.dto';

@Controller('projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }

    @Get()
    async getAllProjects(@Query('lang') language: 'fr' | 'en' = 'en') {
        return this.projectService.getAllProjects(language);
    }

    @Get(':id')
    async getProject(
        @Param('id', ParseIntPipe) id: number,
        @Query('lang') language: 'fr' | 'en' = 'en',
    ) {
        return this.projectService.getProjectById(id, language);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        FileFieldsInterceptor(
            [
                { name: 'image', maxCount: 1 },
                { name: 'video', maxCount: 1 },
            ],
            {
                storage: diskStorage({
                    destination: './files',
                    filename: (req, file, cb) => {
                        const randomName = Array(32)
                            .fill(null)
                            .map(() => Math.round(Math.random() * 16).toString(16))
                            .join('');
                        cb(null, `${randomName}${extname(file.originalname)}`);
                    },
                }),
            },
        ),
    )
    async createProject(
        @Body() createProjectDto: CreateProjectDto,
        @UploadedFiles() files: { image?: Express.Multer.File[]; video?: Express.Multer.File[] },
    ) {
        const imageFile = files?.image?.[0];
        const videoFile = files?.video?.[0];
        return this.projectService.createProject(createProjectDto, imageFile, videoFile);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        FileFieldsInterceptor(
            [
                { name: 'image', maxCount: 1 },
                { name: 'video', maxCount: 1 },
            ],
            {
                storage: diskStorage({
                    destination: './files',
                    filename: (req, file, cb) => {
                        const randomName = Array(32)
                            .fill(null)
                            .map(() => Math.round(Math.random() * 16).toString(16))
                            .join('');
                        cb(null, `${randomName}${extname(file.originalname)}`);
                    },
                }),
            },
        ),
    )
    async updateProject(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateProjectDto: UpdateProjectDto,
        @UploadedFiles() files: { image?: Express.Multer.File[]; video?: Express.Multer.File[] },
    ) {
        const imageFile = files?.image?.[0];
        const videoFile = files?.video?.[0];
        return this.projectService.updateProject(id, updateProjectDto, imageFile, videoFile);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteProject(@Param('id', ParseIntPipe) id: number) {
        await this.projectService.deleteProject(id);
        return { message: 'Project deleted successfully' };
    }
}