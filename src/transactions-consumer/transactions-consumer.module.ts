import { Module } from '@nestjs/common';
import { TransactionsConsumerController } from './transactions-consumer.controller';
import { TransactionsConsumerService } from './transactions-consumer.service';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [HttpModule,PrismaModule],
  providers: [TransactionsConsumerService],
  controllers: [TransactionsConsumerController]
})
export class TransactionsConsumerModule {}
