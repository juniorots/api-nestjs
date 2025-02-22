import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutoModule } from './produto/produto.module';
import { CategoriaModule } from './categoria/categoria.module';
import { CardapioModule } from './cardapio/cardapio.module';

@Module({
  imports: [ProdutoModule, CategoriaModule, CardapioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
