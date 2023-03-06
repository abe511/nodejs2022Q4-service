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
  HttpCode
} from '@nestjs/common';

import { FavoritesService } from './favorites.service';
import { CreateFavoritesDto } from './dto/create-favorite.dto';
import { UpdateFavoritesDto } from './dto/update-favorite.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  create(@Body() createFavoritesDto: CreateFavoritesDto) {
    // if (!createFavoritesDto.login || !createFavoritesDto.password) {
    //   throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    // }
    return this.favoritesService.create(createFavoritesDto);
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
    const response = this.favoritesService.update(id, updateFavoritesDto);
    if(response === 0) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return response;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    if (!this.favoritesService.remove(id)) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
