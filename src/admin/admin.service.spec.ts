import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { promises as fs } from 'fs';
import { join } from 'path';

jest.mock('fs', () => ({
  promises: {
    writeFile: jest.fn(),
  },
}));

describe('AdminService', () => {
  let service: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminService],
    }).compile();

    service = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should upload book image', async () => {
    const file = { originalname: 'test.jpg', buffer: Buffer.from('test') } as Express.Multer.File;
    const result = await service.uploadBookImage(file);
    expect(fs.writeFile).toHaveBeenCalledWith(
      join(__dirname, '..', '..', 'public', 'book', file.originalname),
      file.buffer
    );
    expect(result).toBe(`/public/book/${file.originalname}`);
  });

  it('should save book text', async () => {
    const createBookDto = { image: 'test', text: 'test text' };
    await service.saveBookText(createBookDto);
    expect(fs.writeFile).toHaveBeenCalledWith(
      join(__dirname, '..', '..', 'public', 'book', `${createBookDto.image}.txt`),
      createBookDto.text
    );
  });
});
