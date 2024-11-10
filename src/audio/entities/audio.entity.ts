import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Book } from '../../book/entities/book.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Audio {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.audios, { nullable: false })
  user: User;

  @ManyToOne(() => Book, (book) => book.audios, { nullable: false })
  book: Book;

  @Column({ type: 'varchar', length: 255, nullable: false })
  audio: string;

  @Column({type: 'number', nullable: false})
  length: number;
}
