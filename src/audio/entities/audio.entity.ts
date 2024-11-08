import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Book } from '../../book/entities/book.entity'; // Updated import path
import { User } from '../../user/entities/user.entity';

@Entity()
export class Audio {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.audios, { nullable: false })
  user: User;

  @ManyToOne(() => Book, (book) => book.audios, { nullable: false })
  book: Book;

  @Column({ type: 'varchar', length: 100, nullable: false })
  audioBook: string;

  @Column({ type: 'int', nullable: false })
  start: number;

  @Column({ type: 'int', nullable: false })
  end: number;
}
