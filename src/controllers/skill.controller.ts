import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    UseGuards,
    UseInterceptors,
    UploadedFile,
    ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateSkillDto, UpdateSkillDto } from '../dto/skill.dto';
import { SkillService } from 'src/services/skill.service';
import { JwtAuthGuard } from 'src/jwt/jwt.auth.guard';

@Controller('skills')
export class SkillController {
    constructor(private readonly skillService: SkillService) { }

    @Get()
    async getAllSkills() {
        return this.skillService.getAllSkills();
    }

    @Get(':id')
    async getSkill(@Param('id', ParseIntPipe) id: number) {
        return this.skillService.getSkillById(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        FileInterceptor('file', {
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
        }),
    )
    async createSkill(
        @Body() createSkillDto: CreateSkillDto,
        @UploadedFile() file?: Express.Multer.File,
    ) {
        return this.skillService.createSkill(createSkillDto, file);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        FileInterceptor('file', {
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
        }),
    )
    async updateSkill(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateSkillDto: UpdateSkillDto,
        @UploadedFile() file?: Express.Multer.File,
    ) {
        return this.skillService.updateSkill(id, updateSkillDto, file);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteSkill(@Param('id', ParseIntPipe) id: number) {
        await this.skillService.deleteSkill(id);
        return { message: 'Skill deleted successfully' };
    }
}