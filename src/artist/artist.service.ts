import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
// import { Equals } from 'class-validator';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import Artist from './entities/artist.entity';
import artistDB from "./db/artistDB";


@Injectable()
export class ArtistService {

  db = new artistDB();

  create(createArtistDto: CreateArtistDto): Artist {
    return this.db.createArtist(createArtistDto);
  }

  findAll(): Artist[] {
    return this.db.findAll();
  }

  findOne(id: string): Artist {
    return this.db.findArtist(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist | number{
    return this.db.updateArtist(id, updateArtistDto);
  }

  remove(id: string): boolean {
    return this.db.removeArtist(id);
  }
}
