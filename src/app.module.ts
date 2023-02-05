import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controllers/user/user.controller';
import { ArtistController } from './controllers/artist/artist.controller';
import { AlbumController } from './controllers/album/album.controller';
import { TrackController } from './controllers/track/track.controller';
import { FavoritesController } from './controllers/favorites/favorites.controller';
import { UserService } from './services/user/user.service';
import { ArtistService } from './services/artist/artist.service';
import { AlbumService } from './services/album/album.service';
import { TrackService } from './services/track/track.service';
import { FavoritesService } from './services/favorites/favorites.service';


@Module({
  imports: [],
  controllers: [AppController, UserController, ArtistController, AlbumController, TrackController, FavoritesController],
  providers: [AppService, UserService, ArtistService, AlbumService, TrackService, FavoritesService],
})
export class AppModule {}
