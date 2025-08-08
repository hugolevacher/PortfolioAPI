import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateSkillDto {
    @IsString()
    name: string;

    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber()
    order: number;
}

export class UpdateSkillDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber()
    order?: number;
}