import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ProdutoDTO {
    @IsNotEmpty()
    @IsString()
    id: string;
    
    @IsNotEmpty()
    @IsString()
    nome: string;

    @IsString()
    tipoCardapio: string;

    @IsUUID()
    categoriaId: string;

    // NOTA: Demais campos fora do escopo de uma POC...
}