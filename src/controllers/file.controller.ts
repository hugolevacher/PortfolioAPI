import { Controller, Get, Param, Res, NotFoundException } from '@nestjs/common';
import type { Response } from 'express';
import { FileService } from '../services/file.service';
import * as path from 'path';
import * as fs from 'fs';

@Controller('files')
export class FileController {
    constructor(private readonly fileService: FileService) { }

    @Get(':filename')
    async serveFile(@Param('filename') filename: string, @Res() res: Response) {
        const filePath = path.join(process.cwd(), 'files', filename);

        if (!fs.existsSync(filePath)) {
            throw new NotFoundException('File not found');
        }

        // Get file info from database to set proper content type
        const fileRecord = await this.fileService.getFileByFilename(filename);

        if (fileRecord) {
            res.setHeader('Content-Type', fileRecord.mimetype);
        }

        res.sendFile(filePath);
    }
}