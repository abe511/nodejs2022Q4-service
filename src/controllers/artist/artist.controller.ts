import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import Artist from "src/entities/artist.entity";


@Controller('artist')
export class ArtistController {


    @Get()
    getArtists() {
        // 200 if ok
        return "all artists";
    }

    @Get(":id")
    getArtist(@Param("id") id: string) {
        // 200 if found
        // 400 if id not uuid
        // 404 if not found
        return `artist id: ${id}`;
    }

    @Post()
    createArtist(@Body() artist: Artist) {
        // 201 if artist created
        // 400 body does not contain required fields
        return `new artist ${artist.name} created`;
    }


    @Put(":id")
    updateArtist(@Param("id") id: string, @Body() artist: Artist) {
        // 200 if updated
        // 400 and message if artistId not uuid
        // 404 if not found 
        return `artist ${id} name updated to ${artist.name}`;
    }

    @Delete(":id")
    deleteArtist(@Param("id") id: string) {
        // 204 if found and deleted
        // 400 if artistId not uuid
        // 404 if not found
        return `artist ${id} deleted`;
    }

}
