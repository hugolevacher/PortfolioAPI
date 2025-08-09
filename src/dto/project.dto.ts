import { IsString, IsOptional, IsUrl, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProjectDto {
    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber()
    order: number;

    @IsString()
    titleFr: string;

    @IsString()
    titleEn: string;

    @IsString()
    descriptionFr: string;

    @IsString()
    descriptionEn: string;

    @IsString()
    textFr: string;

    @IsString()
    textEn: string;

    @IsOptional()
    @IsUrl()
    projectUrl?: string;

    @IsOptional()
    @IsUrl()
    githubUrl?: string;
}

export class UpdateProjectDto {
    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber()
    order?: number;

    @IsOptional()
    @IsString()
    titleFr?: string;

    @IsOptional()
    @IsString()
    titleEn?: string;

    @IsOptional()
    @IsString()
    descriptionFr?: string;

    @IsOptional()
    @IsString()
    descriptionEn?: string;

    @IsOptional()
    @IsString()
    textFr?: string;

    @IsOptional()
    @IsString()
    textEn?: string;

    @IsOptional()
    @IsUrl()
    projectUrl?: string;

    @IsOptional()
    @IsUrl()
    githubUrl?: string;
}