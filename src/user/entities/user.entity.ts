import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Audio } from '../../audio/entities/audio.entity';

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

  @Column({ type: 'varchar', length: 100, nullable: true })
  embedding: string;

  @OneToMany(() => Audio, audio => audio.user)
  audios: Audio[];
}
