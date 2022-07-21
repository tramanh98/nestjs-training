import { Test, TestingModule } from '@nestjs/testing';
import { TransactionRepoService } from './transaction-repo.service';

describe('TransactionRepoService', () => {
  let service: TransactionRepoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionRepoService],
    }).compile();

    service = module.get<TransactionRepoService>(TransactionRepoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
