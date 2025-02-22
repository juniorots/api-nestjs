import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { Categoria } from '@prisma/client';
import { CategoriaDTO } from './categoria-dto';

@Controller('categoria')
export class CategoriaController {
    constructor(private readonly CategoriaService: CategoriaService) {}

    @Post()
    async criarCategoria(@Body() Categoria: CategoriaDTO): Promise<Categoria> {
        return await this.CategoriaService.salvarCategoria(Categoria);
    }

    @Get()
    async listarCategoria(): Promise<Categoria[]> {
        return await this.CategoriaService.listarCategoria();
    }

    @Put()
    async autalizarCategoria(@Body() Categoria: CategoriaDTO): Promise<Categoria> {
        return await this.CategoriaService.atualizarCategoria(Categoria);
    }

    @Delete(":id")
    async apagarCategoria(@Param("id") idCategoria: string): Promise<boolean> {
        return await this.CategoriaService.apagarCategoria(idCategoria);
    }

    @Get(":id")
    async detalharCategoria(@Param("id") idCategoria: string): Promise<Categoria> {
        return await this.CategoriaService.detalharCategoria(idCategoria);
    }
}