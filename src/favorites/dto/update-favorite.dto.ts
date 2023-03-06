import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoritesDto } from './create-favorite.dto';

export class UpdateFavoritesDto extends PartialType(CreateFavoritesDto) {
    artists: string[]; // favorite artists ids
    albums: string[]; // favorite albums ids
    tracks: string[]; // favorite tracks ids
}