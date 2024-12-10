import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AudioService } from './audio.service';
import { Audio } from './entities/audio.entity';

describe('AudioService', () => {
  let service: AudioService;
  let repository: Repository<Audio>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AudioService,
        {
          provide: getRepositoryToken(Audio),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AudioService>(AudioService);
    repository = module.get<Repository<Audio>>(getRepositoryToken(Audio));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
