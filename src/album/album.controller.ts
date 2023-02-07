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

import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    // if (!createAlbumDto.login || !createAlbumDto.password) {
    //   throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    // }
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const album = this.albumService.findOne(id);
    if (!album) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const response = this.albumService.update(id, updateAlbumDto);
    if(response === 0) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return response;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    if (!this.albumService.remove(id)) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
