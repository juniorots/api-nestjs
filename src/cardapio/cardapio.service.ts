import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ObjectId } from 'bson';
import { Produto } from '@prisma/client';

@Injectable()
export class CardapioService {
    constructor(private prisma: PrismaService) {}

    async listarCardapio(): Promise<Produto[]> {
        let produtos = await this.prisma.produto.findMany();
        const now = new Date();
        const hour = now.getHours();

        if (hour > 6 && hour < 18) 
            return produtos.filter(p => p.tipoCardapio?.indexOf("D") === 0);
        
        return produtos.filter(p => p.tipoCardapio?.indexOf("N") === 0);;
    }

}
