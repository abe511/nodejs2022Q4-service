import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

import { FavoritesService } from './favorites.service';
import { CreateFavoritesDto } from './dto/create-favorite.dto';
import { UpdateFavoritesDto } from './dto/update-favorite.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  create(@Body() createFavoritesDto: CreateFavoritesDto) {
    return this.favoritesService.save(createFavoritesDto);
  }

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const favorites = this.favoritesService.findOne(id);
    if (!favorites) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return favorites;
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateFavoritesDto: UpdateFavoritesDto,
  ) {
    return this.favoritesService.update(id, updateFavoritesDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    if (!this.favoritesService.remove(id)) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
