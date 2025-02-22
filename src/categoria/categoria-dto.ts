import { Produto } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CategoriaDTO {
    @IsNotEmpty()
    @IsString()
    id: string;
    
    @IsNotEmpty()
    @IsString()
    nome: string;
}