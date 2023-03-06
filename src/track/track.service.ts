import { Injectable, NotFoundException } from '@nestjs/common';
// import { Equals } from 'class-validator';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async save(createTrackDto: CreateTrackDto): Promise<Track> {
    return this.trackRepository.save(createTrackDto);
  }

  async findAll(): Promise<Track[]> {
    return await this.trackRepository.find();
  }

  async findOne(id: string): Promise<Track> {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) throw new NotFoundException('Track Not Found');
    return track;
  }

  async update(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<UpdateResult> {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) throw new NotFoundException('Track Not Found');
    return await this.trackRepository.update(id, updateTrackDto);
  }

  async remove(id: string): Promise<void> {
    const track = await this.trackRepository.delete(id);
    if (!track.affected) throw new NotFoundException('Track Not Found');
  }
}
