import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Audio } from '../../audio/entities/audio.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  image: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  content: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  intro: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  author: string;

  @Column({ type: 'integer', nullable: false })
  runningTime: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  press: string;

  @OneToMany(() => Audio, audio => audio.book)
  audios: Audio[];
}
