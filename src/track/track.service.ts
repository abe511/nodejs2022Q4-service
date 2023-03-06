import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
// import { Equals } from 'class-validator';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import Track from './entities/track.entity';
import trackDB from "./db/trackDB";


@Injectable()
export class TrackService {

  db = new trackDB();

  create(createTrackDto: CreateTrackDto): Track {
    return this.db.createTrack(createTrackDto);
  }

  findAll(): Track[] {
    return this.db.findAll();
  }

  findOne(id: string): Track {
    return this.db.findTrack(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track | number{
    return this.db.updateTrack(id, updateTrackDto);
  }

  remove(id: string): boolean {
    return this.db.removeTrack(id);
  }
}
