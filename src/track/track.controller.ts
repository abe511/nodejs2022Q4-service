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

import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    // if (!createTrackDto.login || !createTrackDto.password) {
    //   throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    // }
    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const track = this.trackService.findOne(id);
    if (!track) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return track;
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const response = this.trackService.update(id, updateTrackDto);
    if(response === 0) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return response;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    if (!this.trackService.remove(id)) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
