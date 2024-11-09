import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Audio } from '../../audio/entities/audio.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length : 100,  nullable: false })
  image: string;

  @Column({ type: 'varchar', length : 100, nullable: false })
  detail: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  title: string;

  @OneToMany(() => Audio, (audio) => audio.book)
  audios: Audio[];
}
