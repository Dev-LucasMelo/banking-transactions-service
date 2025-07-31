import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsConsumerController } from './transactions-consumer.controller';

describe('TransactionsConsumerController', () => {
  let controller: TransactionsConsumerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsConsumerController],
    }).compile();

    controller = module.get<TransactionsConsumerController>(TransactionsConsumerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
