import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Audio } from '../../audio/entities/audio.entity'; // Updated import path

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, nullable: false })
  user: string;

  @Column({ type: 'char', length: 128, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  email: string;

  @Column({ type: 'int', nullable: false })
  admin: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  embedding: string;

  @OneToMany(() => Audio, (audio) => audio.user)
  audios: Audio[];
}
