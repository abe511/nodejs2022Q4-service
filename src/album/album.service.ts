import { Injectable, NotFoundException } from '@nestjs/common';
// import { Equals } from 'class-validator';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}

  async save(createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumRepository.save(createAlbumDto);
  }

  async findAll(): Promise<Album[]> {
    return await this.albumRepository.find();
  }

  async findOne(id: string): Promise<Album> {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) throw new NotFoundException('Album Not Found');
    return album;
  }

  async update(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<UpdateResult> {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) throw new NotFoundException('Album Not Found');
    return await this.albumRepository.update(id, updateAlbumDto);
  }

  async remove(id: string): Promise<void> {
    const album = await this.albumRepository.delete(id);
    if (!album.affected) throw new NotFoundException('Album Not Found');
  }
}
