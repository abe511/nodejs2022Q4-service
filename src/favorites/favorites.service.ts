import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
// import { Equals } from 'class-validator';
import { CreateFavoritesDto } from './dto/create-favorite.dto';
import { UpdateFavoritesDto } from './dto/update-favorite.dto';
import { Favorites } from './entities/favorites.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites)
    private favoritesRepository: Repository<Favorites>,
  ) {}

  async save(createFavoritesDto: CreateFavoritesDto): Promise<Favorites> {
    return this.favoritesRepository.save(createFavoritesDto);
  }

  async findAll(): Promise<Favorites[]> {
    return await this.favoritesRepository.find();
  }

  async findOne(id: string): Promise<Favorites> {
    const favorites = await this.favoritesRepository.findOneBy({ id });
    if (!favorites) throw new NotFoundException('Favorites Not Found');
    return favorites;
  }

  async update(
    id: string,
    updateFavoritesDto: UpdateFavoritesDto,
  ): Promise<UpdateResult> {
    const favorites = await this.favoritesRepository.findOneBy({ id });
    if (!favorites) throw new NotFoundException('Favorites Not Found');
    return await this.favoritesRepository.update(id, updateFavoritesDto);
  }

  async remove(id: string): Promise<void> {
    const favorites = await this.favoritesRepository.delete(id);
    if (!favorites.affected) throw new NotFoundException('Favorites Not Found');
  }
}
