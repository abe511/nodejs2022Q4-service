import { v4 as uuid } from 'uuid';
import DB from "src/db/DB";
import Favorites from "src/favorites/entities/favorites.entity";
import { CreateFavoritesDto } from "src/favorites/dto/create-favorite.dto";
import { UpdateFavoritesDto } from "src/favorites/dto/update-favorite.dto";
// import bcrypt from "bcrypt";
// import { Exclude } from 'class-transformer';

export default class favoritesDB extends DB{
    db: Favorites[] = [];

    findAll(): Favorites[] {
        return this.db;
    }

    findFavorites(id: string): Favorites | null {
        const idx: number = this.findOne(this.db, id);
        if(idx >= 0) {
            const favorites = this.db[idx];
            return favorites;
        }
        return null;
    };

    createFavorites(createFavoritesDto: CreateFavoritesDto): Favorites {
        const favorites: Favorites = {
            albums: createFavoritesDto.albums,
            artists: createFavoritesDto.artists,
            tracks: createFavoritesDto.tracks,
        };
        this.db.push(favorites);
        return favorites;
    }

    updateFavorites(id: string, data: UpdateFavoritesDto): Favorites | number {
        const idx = this.findOne(this.db, id);
        if(idx >= 0) {
            const favorites = this.db[idx];
            favorites.albums = data.albums;
            favorites.artists = data.artists;
            favorites.tracks = data.tracks;
            return favorites;
        }
        return 0;
    };

    removeFavorites(id: string): boolean {
        const idx = this.findOne(this.db, id);
        if(idx >= 0) {
            this.remove(this.db, id);
            return true;
        }
        return false;
    }
}