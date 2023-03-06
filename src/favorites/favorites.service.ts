import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
// import { Equals } from 'class-validator';
import { CreateFavoritesDto } from './dto/create-favorite.dto';
import { UpdateFavoritesDto } from './dto/update-favorite.dto';
import Favorites from './entities/favorites.entity';
import favoritesDB from "./db/favoritesDB";


@Injectable()
export class FavoritesService {

  db = new favoritesDB();

  create(createFavoritesDto: CreateFavoritesDto): Favorites {
    return this.db.createFavorites(createFavoritesDto);
  }

  findAll(): Favorites[] {
    return this.db.findAll();
  }

  findOne(id: string): Favorites {
    return this.db.findFavorites(id);
  }

  update(id: string, updateFavoritesDto: UpdateFavoritesDto): Favorites | number{
    return this.db.updateFavorites(id, updateFavoritesDto);
  }

  remove(id: string): boolean {
    return this.db.removeFavorites(id);
  }
}
