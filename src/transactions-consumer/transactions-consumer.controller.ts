import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, KafkaContext, Payload } from '@nestjs/microservices';
import { TransactionsConsumerService } from './transactions-consumer.service';
import { eventData } from './types/event.types';

@Controller('transactions-consumer')
export class TransactionsConsumerController {

    constructor(
        private readonly service: TransactionsConsumerService
    ) { }

    @EventPattern('transactions_topic')
    async handleTransfer(@Payload() event: eventData, @Ctx() context: KafkaContext) {
        const consumer = context.getConsumer();
        const topic = context.getTopic();
        const partition = context.getPartition();
        const offset = context.getMessage().offset;

        try {
            await this.service.processTransfer(event)
        } catch (err) {
            console.warn('Falha ignorada !:');

            console.log(err)
        } finally {
            await consumer.commitOffsets([{
                topic,
                partition,
                offset: String(Number(offset) + 1),
            }]);
        }
    }

}

