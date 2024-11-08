import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { CreateBookDto } from '../book/dto/create-book.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../book/entities/book.entity';

describe('AdminController', () => {
  let controller: AdminController;
  let service: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [AdminService,
        {
          provide: getRepositoryToken(Book),
          useClass: Repository,
        }
      ],
    }).compile();

    controller = module.get<AdminController>(AdminController);
    service = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should upload book image', async () => {
    const file = { originalname: 'test.jpg', buffer: Buffer.from('test') } as Express.Multer.File;
    jest.spyOn(service, 'uploadBookImage').mockResolvedValue(`/public/book/${file.originalname}`);
    const result = await controller.uploadBookImage(file);
    expect(result).toBe(`/public/book/${file.originalname}`);
    expect(service.uploadBookImage).toHaveBeenCalledWith(file);
  });

  it('should save book text', async () => {
    const createBookDto: CreateBookDto = { image: 'test', text: 'test text' };
    jest.spyOn(service, 'saveBookText').mockResolvedValue();
    await controller.saveBookText(createBookDto);
    expect(service.saveBookText).toHaveBeenCalledWith(createBookDto);
  });
});
