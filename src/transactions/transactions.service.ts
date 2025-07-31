import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionsConsumerService } from 'src/transactions-consumer/transactions-consumer.service';
import { responseTransactionDetails } from './types/response.types';

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

    async findTransactionById(id: string) {

        let transaction = await this.repository.transacao.findUniqueOrThrow({
            where: {
                id: id
            }
        })

        let originClientData = await this.transactionsConsumerService.getDataClientByAccountId(transaction.conta_origem_id)
        let targetClientData = await this.transactionsConsumerService.getDataClientByAccountId(transaction.conta_destino_id)

        let result: responseTransactionDetails = {
            id: transaction.id,
            tipo: transaction.tipo,
            descricao: transaction.descricao,
            status: transaction.status,
            valor: Number(transaction.valor).toFixed(2),
            cliente_origem: {
                id: originClientData.cliente.id,
                nome_completo: originClientData.cliente.nome_completo,
                email: originClientData.cliente.email,
                url_perfil: originClientData.cliente.url_perfil,
                Conta: {
                    id: originClientData.cliente.Conta.id,
                    numero_conta: originClientData.cliente.Conta.numero_conta,
                    agencia: originClientData.cliente.Conta.agencia,
                }
            },
            cliente_destino: {
                id: targetClientData.cliente.id,
                nome_completo: targetClientData.cliente.nome_completo,
                email: targetClientData.cliente.email,
                url_perfil: targetClientData.cliente.url_perfil,
                Conta: {
                    id: targetClientData.cliente.Conta.id,
                    numero_conta: targetClientData.cliente.Conta.numero_conta,
                    agencia: targetClientData.cliente.Conta.agencia,
                }
            },
        }

        return result
    }


}
