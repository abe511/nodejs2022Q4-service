import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import Track from "src/entities/track.entity";

@Controller('track')
export class TrackController {

    @Get()
    getTracks() {
        // 200 if ok
        return "all tracks";
    }

    @Get(":id")
    getTrack(@Param("id") id: string) {
        // 200 if found
        // 400 if id not uuid
        // 404 if not found
        return `track id: ${id}`;
    }

    @Post()
    createTrack(@Body() track: Track) {
    // createTrack(@Body("track") body, track: Track) {
        // 201 if track created
        // 400 body does not contain required fields
        return `new track ${track.name} created`;
    }


    @Put(":id")
    updateTrack(@Param("id") id: string, @Body() track: Track) {
        // 200 if updated
        // 400 and message if trackId not uuid
        // 404 if not found 
        return `track ${id} name updated to ${track.name}`;
    }

    @Delete(":id")
    deleteTrack(@Param("id") id: string) {
        // 204 if found and deleted
        // 400 if trackId not uuid
        // 404 if not found
        return `track ${id} deleted`;
    }
}
