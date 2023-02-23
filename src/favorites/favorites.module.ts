import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { Favorites } from './entities/favorites.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorites])],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
