import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { Produto } from '@prisma/client';
import { ProdutoDTO } from './produto-dto';

@Controller('produto')
export class ProdutoController {
    constructor(private readonly produtoService: ProdutoService) {}

    @Post()
    async criarProduto(@Body() produto: ProdutoDTO): Promise<Produto> {
        return await this.produtoService.salvarProduto(produto);
    }

    @Get()
    async listarProduto(): Promise<Produto[]> {
        return await this.produtoService.listarProduto();
    }

    @Put()
    async autalizarProduto(@Body() produto: ProdutoDTO): Promise<Produto> {
        return await this.produtoService.atualizarProduto(produto);
    }

    @Delete(":id")
    async apagarProduto(@Param("id") idProduto: string): Promise<boolean> {
        return await this.produtoService.apagarProduto(idProduto);
    }

    @Get(":id")
    async detalharProduto(@Param("id") idProduto: string): Promise<Produto> {
        return await this.produtoService.detalharProduto(idProduto);
    }
}