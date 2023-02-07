import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
// import { Equals } from 'class-validator';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import Album from './entities/album.entity';
import albumDB from "./db/albumDB";


@Injectable()
export class AlbumService {

  db = new albumDB();

  create(createAlbumDto: CreateAlbumDto): Album {
    return this.db.createAlbum(createAlbumDto);
  }

  findAll(): Album[] {
    return this.db.findAll();
  }

  findOne(id: string): Album {
    return this.db.findAlbum(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album | number{
    return this.db.updateAlbum(id, updateAlbumDto);
  }

  remove(id: string): boolean {
    return this.db.removeAlbum(id);
  }
}
