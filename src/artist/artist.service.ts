import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
// import { Equals } from 'class-validator';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async save(createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.artistRepository.save(createArtistDto);
  }

  async findAll(): Promise<Artist[]> {
    return await this.artistRepository.find();
  }

  async findOne(id: string): Promise<Artist> {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) throw new NotFoundException('Artist Not Found');
    return artist;
  }

  async update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<UpdateResult> {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) throw new NotFoundException('Artist Not Found');
    return await this.artistRepository.update(id, updateArtistDto);
  }

  async remove(id: string): Promise<void> {
    const artist = await this.artistRepository.delete(id);
    if (!artist.affected) throw new NotFoundException('Artist Not Found');
  }
}
