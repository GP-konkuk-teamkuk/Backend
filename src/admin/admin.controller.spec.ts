import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from '../book/dto/create-book.dto';
import { Book } from '../book/entities/book.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

describe('AdminController', () => {
  let controller: AdminController;
  let service: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        AdminService,
        {
          provide: getRepositoryToken(Book),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<AdminController>(AdminController);
    service = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should upload book', async () => {
    const file = { originalname: 'test.jpg', buffer: Buffer.from('test') } as Express.Multer.File;
    const createBookDto: CreateBookDto = { image: 'test', text: 'test text', title: 'test title' };
    jest.spyOn(service, 'uploadBook').mockResolvedValue();

    await controller.uploadBook(file, createBookDto);

    expect(service.uploadBook).toHaveBeenCalledWith(file, createBookDto);
  });
});
