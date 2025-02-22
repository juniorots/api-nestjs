import { Controller, Get } from '@nestjs/common';
import { CardapioService } from './cardapio.service';
import { Produto } from '@prisma/client';

@Controller('Cardapio')
export class CardapioController {
    constructor(private readonly CardapioService: CardapioService) {}

    @Get()
    async listarCardapio(): Promise<Produto[]> {
        return await this.CardapioService.listarCardapio();
    }

}