import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionsConsumerService } from 'src/transactions-consumer/transactions-consumer.service';

@Injectable()
export class TransactionsService {

    constructor(
        private readonly repository: PrismaService,
        private readonly transactionsConsumerService: TransactionsConsumerService
    ) { }

    async findTransactionsByOriginClientId(clientId: string) {

        const { result } = await this.transactionsConsumerService.getDataClientById(clientId);
        const { Conta } = result

        return await this.repository.transacao.findMany({
            where: {
                conta_origem_id: Conta.id
            }
        })

    }
}
