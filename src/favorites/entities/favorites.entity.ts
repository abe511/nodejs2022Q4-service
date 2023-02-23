import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  artists: string; // favorite artists ids

  @Column()
  albums: string; // favorite albums ids

  @Column()
  tracks: string; // favorite tracks ids
}
