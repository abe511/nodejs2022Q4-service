import { Entity, Column, PrimaryGeneratedColumn, VersionColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string; // uuid v4
  
  @Column({length: 50})

  login: string;
  
  @Column({length: 256})
  password: string;
  
  @VersionColumn()
  version: number; // integer number, increments on update
  
  // @Column("bigint")
  // createdAt: number; // timestamp of creation
  
  // @Column("bigint")
  // updatedAt: number; // timestamp of last update


  // @Column({type: "timestamptz", nullable: true})
  // createdAt: Date; // timestamp of creation
  
  // @Column({type: "timestamptz", nullable: true})
  // updatedAt: Date; // timestamp of last update

  @CreateDateColumn({nullable: true})
  createdAt; // timestamp of creation

  @UpdateDateColumn({nullable: true})
  updatedAt; // timestamp of last update
}
