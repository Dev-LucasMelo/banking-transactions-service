import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TransactionsConsumerModule } from 'src/transactions-consumer/transactions-consumer.module';

@Module({
  imports: [PrismaModule, TransactionsConsumerModule],
  controllers: [TransactionsController],
  providers: [TransactionsService]
})
export class TransactionsModule { }
