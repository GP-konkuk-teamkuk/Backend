import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { promises as fs } from 'fs';
import { join } from 'path';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../book/entities/book.entity';

jest.mock('fs', () => ({
  promises: {
    writeFile: jest.fn(),
  },
}));

describe('AdminService', () => {
  let service: AdminService;
  let repository: Repository<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: getRepositoryToken(Book),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AdminService>(AdminService);
    repository = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should upload book', async () => {
    const file = { originalname: 'test.jpg', buffer: Buffer.from('test') } as Express.Multer.File;
    const createBookDto = { image: 'test', text: 'test text', title: 'test title' };
    jest.spyOn(repository, 'save').mockResolvedValue({} as any);

    await service.uploadBook(file, createBookDto);

    expect(fs.writeFile).toHaveBeenCalledWith(
      join(__dirname, '..', '..', 'public', 'book', file.originalname),
      file.buffer
    );
    expect(fs.writeFile).toHaveBeenCalledWith(
      join(__dirname, '..', '..', 'public', 'book', `${createBookDto.image}.txt`),
      createBookDto.text
    );
    expect(repository.save).toHaveBeenCalledWith({
      image: `/public/book/${file.originalname}`,
      detail: join(__dirname, '..', '..', 'public', 'book', `${createBookDto.image}.txt`),
      title: createBookDto.title,
    });
  });
});
