import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
    constructor(private readonly databaseService: DatabaseService) { }

    async saveFile(file: Express.Multer.File) {
        const fileRecord = await this.databaseService.file.create({
            data: {
                filename: file.filename,
                originalName: file.originalname,
                path: file.path,
                mimetype: file.mimetype,
                size: file.size,
            },
        });
        return fileRecord;
    }

    async deleteFile(fileId: number) {
        const file = await this.databaseService.file.findUnique({
            where: { id: fileId },
        });

        if (file) {
            // Delete physical file
            if (fs.existsSync(file.path)) {
                fs.unlinkSync(file.path);
            }

            // Delete database record
            await this.databaseService.file.delete({
                where: { id: fileId },
            });
        }
    }

    async getFile(fileId: number) {
        return this.databaseService.file.findUnique({
            where: { id: fileId },
        });
    }

    async getFileByFilename(filename: string) {
        return this.databaseService.file.findFirst({
            where: { filename },
        });
    }
}