import { v4 as uuid } from 'uuid';
import DB from "src/db/DB";
import Album from "src/album/entities/album.entity";
import { CreateAlbumDto } from "src/album/dto/create-album.dto";
import { UpdateAlbumDto } from "src/album/dto/update-album.dto";
// import bcrypt from "bcrypt";
// import { Exclude } from 'class-transformer';

export default class albumDB extends DB{
    db: Album[] = [];

    findAll(): Album[] {
        return this.db;
    }

    findAlbum(id: string): Album | null {
        const idx: number = this.findOne(this.db, id);
        if(idx >= 0) {
            const album = this.db[idx];
            return album;
        }
        return null;
    };

    createAlbum(createAlbumDto: CreateAlbumDto): Album {
        const album: Album = {
            id: uuid(),
            name: createAlbumDto.name,
            artistId: createAlbumDto.artistId,
            year: createAlbumDto.year,
        };
        this.db.push(album);
        return album;
    }

    updateAlbum(id: string, data: UpdateAlbumDto): Album | number {
        const idx = this.findOne(this.db, id);
        if(idx >= 0) {
            const album = this.db[idx];
            album.name = data.name;
            album.artistId = data.artistId;
            album.year = data.year;
            return album;
        }
        return 0;
    };

    removeAlbum(id: string): boolean {
        const idx = this.findOne(this.db, id);
        if(idx >= 0) {
            this.remove(this.db, id);
            return true;
        }
        return false;
    }
}