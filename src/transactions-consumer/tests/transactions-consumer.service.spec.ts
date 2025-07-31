import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsConsumerService } from './transactions-consumer.service';

describe('TransactionsConsumerService', () => {
  let service: TransactionsConsumerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionsConsumerService],
    }).compile();

    service = module.get<TransactionsConsumerService>(TransactionsConsumerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
