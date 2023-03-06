import { v4 as uuid } from 'uuid';
import DB from "src/db/DB";
import Artist from "src/artist/entities/artist.entity";
import { CreateArtistDto } from "src/artist/dto/create-artist.dto";
import { UpdateArtistDto } from "src/artist/dto/update-artist.dto";
// import bcrypt from "bcrypt";
// import { Exclude } from 'class-transformer';

export default class artistDB extends DB{
    db: Artist[] = [];

    findAll(): Artist[] {
        return this.db;
    }

    findArtist(id: string): Artist | null {
        const idx: number = this.findOne(this.db, id);
        if(idx >= 0) {
            const artist = this.db[idx];
            return artist;
        }
        return null;
    };

    createArtist(createArtistDto: CreateArtistDto): Artist {
        const artist: Artist = {
            id: uuid(),
            name: createArtistDto.name,
            grammy: createArtistDto.grammy,
        };
        this.db.push(artist);
        return artist;
    }

    updateArtist(id: string, data: UpdateArtistDto): Artist | number {
        const idx = this.findOne(this.db, id);
        if(idx >= 0) {
            const artist = this.db[idx];
            artist.name = data.name;
            artist.grammy = data.grammy;
            return artist;
        }
        return 0;
    };

    removeArtist(id: string): boolean {
        const idx = this.findOne(this.db, id);
        if(idx >= 0) {
            this.remove(this.db, id);
            return true;
        }
        return false;
    }
}