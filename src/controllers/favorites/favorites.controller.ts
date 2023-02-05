import { Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import {Favorites, FavoritesResponse} from "src/entities/favorites.entity";


@Controller('favs')
export class FavoritesController {

    // GET ALL FAVS (artists, albums, tracks)

    @Get()
    getFavorites() {
        // return 200 and all fav records if ok
        return "all favorites";
    }


    // FAVS/TRACKS

    @Post("/track/:id")
    // createFavorite(favorites: Favorites) {
    createFavoriteTrack(@Param("id") id: string) {
        // 201 if trackId exists
        // 400 if trackId not uuid
        // 422 if trackId does not exist
        return `new favorite track ${id} created`;
    }


    @Delete("/track/:id")
    deleteFavoriteTrack(@Param("id") id: string) {
        // 204 if found and deleted
        // 400 if trackId not uuid
        // 404 if not found in favorites
        return `favorite track ${id} deleted`;
    }


    // FAVS/ALBUMS

    @Post("/album/:id")
    // createFavorite(favorites: Favorites) {
    createFavoriteAlbum(@Param("id") id: string) {
        // 201 if albumId exists
        // 400 if albumId not uuid
        // 422 if albumId does not exist
        return `new favorite album ${id} created`;
    }


    @Delete("/album/:id")
    deleteFavoriteAlbum(@Param("id") id: string) {
        // 204 if found and deleted
        // 400 if albumId not uuid
        // 404 if not found in favorites
        return `favorite album ${id} deleted`;
    }


    // FAVS/ARTISTS

    @Post("/artist/:id")
    // createFavorite(favorites: Favorites) {
    createFavoriteArtist(@Param("id") id: string) {
        // 201 if artistId exists
        // 400 if artistId not uuid
        // 422 if artistId does not exist
        return `new favorite artist ${id} created`;
    }


    @Delete("/artist/:id")
    deleteFavoriteArtist(@Param("id") id: string) {
        // 204 if found and deleted
        // 400 if artistId not uuid
        // 404 if not found in favorites
        return `favorite artist ${id} deleted`;
    }

}
