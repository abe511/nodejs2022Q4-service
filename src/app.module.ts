import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavoritesModule } from './favorites/favorites.module';
import { User } from './user/entities/user.entity';
import { Artist } from './artist/entities/artist.entity';
import { Album } from './album/entities/album.entity';
import { Track } from './track/entities/track.entity';
import { Favorites } from './favorites/entities/favorites.entity';
import { CustomLoggerModule } from './custom-logger/custom-logger.module';

import { config } from 'dotenv';
config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: true, // FALSE FOR PRODUCTION MODE
      logging: false,
      entities: [User, Artist, Album, Track, Favorites],
      migrations: [],
      subscribers: [],
      retryAttempts: 3,
      retryDelay: 1000,
    }),
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoritesModule,
    CustomLoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
