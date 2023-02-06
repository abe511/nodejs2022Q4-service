import { v4 as uuid } from 'uuid';
import DB from "src/db/DB";
import Track from "src/track/entities/track.entity";
import { CreateTrackDto } from "src/track/dto/create-track.dto";
import { UpdateTrackDto } from "src/track/dto/update-track.dto";
// import bcrypt from "bcrypt";
// import { Exclude } from 'class-transformer';

export default class trackDB extends DB{
    db: Track[] = [];

    findAll(): Track[] {
        return this.db;
    }

    findTrack(id: string): Track | null {
        const idx: number = this.findOne(this.db, id);
        if(idx >= 0) {
            const track = this.db[idx];
            return track;
        }
        return null;
    };

    createTrack(createTrackDto: CreateTrackDto): Track {
        const track: Track = {
            id: uuid(),
            name: createTrackDto.name,
            artistId: createTrackDto.artistId,
            albumId: createTrackDto.albumId,
            duration: createTrackDto.duration
        };
        this.db.push(track);
        return track;
    }

    updateTrack(id: string, data: UpdateTrackDto): Track | number {
        const idx = this.findOne(this.db, id);
        if(idx >= 0) {
            const track = this.db[idx];
            track.name = data.name;
            track.albumId = data.albumId;
            track.artistId = data.artistId;
            track.duration = data.duration;
            return track;
        }
        return 0;
    };

    removeTrack(id: string): boolean {
        const idx = this.findOne(this.db, id);
        if(idx >= 0) {
            this.remove(this.db, id);
            return true;
        }
        return false;
    }
}