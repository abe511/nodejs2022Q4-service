import Album from "./album.entity";
import Artist from "./artist.entity";
import Track from "./track.entity";


export interface Favorites {
    artists: string[]; // favorite artists ids
    albums: string[]; // favorite albums ids
    tracks: string[]; // favorite tracks ids
}

export interface FavoritesResponse{
    artists: Artist[];
    albums: Album[];
    tracks: Track[];
}
