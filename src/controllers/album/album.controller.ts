import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import Album from "src/entities/album.entity";

@Controller('album')
export class AlbumController {

    @Get()
    getAlbums() {
        // 200 if ok
        return "all albums";
    }

    @Get(":id")
    getAlbum(@Param("id") id: string) {
        // 200 if found
        // 400 if id not uuid
        // 404 if not found
        return `album id: ${id}`;
    }

    @Post()
    createAlbum(@Body() album: Album) {
        // 201 if album created
        // 400 body does not contain required fields
        return `new album ${album.name} created`;
    }


    @Put(":id")
    updateAlbum(@Param("id") id: string, @Body() album: Album) {
        // 200 if updated
        // 400 and message if albumId not uuid
        // 404 if not found 
        return `album ${id} name updated to ${album.name}`;
    }

    @Delete(":id")
    deleteAlbum(@Param("id") id: string) {
        // 204 if found and deleted
        // 400 if albumId not uuid
        // 404 if not found
        return `album ${id} deleted`;
    }

}
