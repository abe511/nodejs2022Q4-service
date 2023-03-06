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

import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    // if (!createArtistDto.login || !createArtistDto.password) {
    //   throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    // }
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const artist = this.artistService.findOne(id);
    if (!artist) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const response = this.artistService.update(id, updateArtistDto);
    if(response === 0) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return response;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    if (!this.artistService.remove(id)) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
