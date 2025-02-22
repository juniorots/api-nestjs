import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Categoria } from '@prisma/client';
import { CategoriaDTO } from './categoria-dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ObjectId } from 'bson';

@Injectable()
export class CategoriaService {
    constructor(private prisma: PrismaService) {}

    async salvarCategoria(Categoria:CategoriaDTO): Promise<Categoria> {
        return await this.prisma.categoria.create({data: {
            nome: Categoria.nome,
        }});
    }

    async listarCategoria(): Promise<Categoria[]> {
        return await this.prisma.categoria.findMany();
    }

    async atualizarCategoria(Categoria: CategoriaDTO): Promise<Categoria> {
        return await this.prisma.categoria
            .update({
                where: {id: Categoria.id },
                data: {
                    nome: Categoria.nome,
                }
            });
    }

    async apagarCategoria(idCategoria: string): Promise<boolean> {
        let objectId = new ObjectId(idCategoria);
        await this.prisma.categoria.delete({
            where: {id: objectId.toHexString()}
        });
        return true;
    }

    async detalharCategoria(idCategoria: string): Promise<Categoria> {
        try {
            let objectCategoria = new ObjectId(idCategoria);
            return await this.prisma.categoria
                .findUniqueOrThrow({
                    where: {id: objectCategoria.toHexString()},
                    include: { produtos: true }
                });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException(`ID: ${idCategoria} nao encontrado.`);
            }
            throw error;
        }
    }
}
