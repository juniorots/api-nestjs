import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Produto } from '@prisma/client';
import { ProdutoDTO } from './produto-dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ObjectId } from 'bson';

@Injectable()
export class ProdutoService {
    constructor(private prisma: PrismaService) {}

    async salvarProduto(produto:ProdutoDTO): Promise<Produto> {
        let objectId = new ObjectId(produto.categoriaId);
        return await this.prisma.produto.create({data: {
            nome: produto.nome,
            tipoCardapio: produto.tipoCardapio,
            categoriaId: objectId.toHexString()
        }});
    }

    async listarProduto(): Promise<Produto[]> {
        return await this.prisma.produto.findMany();
    }

    async atualizarProduto(produto: ProdutoDTO): Promise<Produto> {
        return await this.prisma.produto
            .update({
                where: {id: produto.id },
                data: {
                    nome: produto.nome,
                    tipoCardapio: produto.tipoCardapio,
                    categoriaId: produto.categoriaId
                }
            });
    }

    async apagarProduto(idProduto: string): Promise<boolean> {
        let objectId = new ObjectId(idProduto);
        await this.prisma.produto.delete({
            where: {id: objectId.toHexString()}
        });
        return true;
    }

    async detalharProduto(idProduto: string): Promise<Produto> {
        try {
            let objectId = new ObjectId(idProduto);
            return await this.prisma.produto
                .findUniqueOrThrow({
                    where: {id: objectId.toHexString()}
                });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException(`ID: ${idProduto} nao encontrado.`);
            }
            throw error;
        }
    }
}
