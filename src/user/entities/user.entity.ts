import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column({ length: 50 })
  login: string;

  @Column({ length: 256 })
  password: string;

  @VersionColumn()
  version: number; // integer number, increments on update

  @CreateDateColumn()
  createdAt: Date; // timestamp of creation

  @UpdateDateColumn()
  updatedAt: Date; // timestamp of last update
}
