import { BadRequestException, Injectable } from '@nestjs/common';
import { eventData } from './types/event.types';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { clientResponseType, responseType } from './types/response.types';
import { clientData } from './types/client.types';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransactionsConsumerService {
    private readonly BaseUrlClient: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
        private readonly repository: PrismaService
    ) {
        this.BaseUrlClient = String(this.configService.get<string>('BASE_URL_CLIENT_SERVICE'));
    }

    async getDataClientById(id: string): Promise<responseType> {
        return await firstValueFrom(
            this.httpService.get(`${this.BaseUrlClient}client/${id}`)
        ).then((response) => {
            return response.data;
        }).catch((err) => {
            throw new BadRequestException('Erro ao buscar cliente');
        });
    }

    async getDataClientByBankingData(bankingAccountNumber: string, bankingAgencyNumber: string): Promise<any> {
        return await firstValueFrom(
            this.httpService.get(`${this.BaseUrlClient}client/banking/${bankingAccountNumber}/${bankingAgencyNumber}`)
        ).then((response) => {
            return response.data;
        }).catch((err) => {
            throw new BadRequestException('Erro ao buscar cliente');
        });
    }

    async getDataClientByAccountId(accountId: string): Promise<clientResponseType> {
        return await firstValueFrom(
            this.httpService.get(`${this.BaseUrlClient}account/${accountId}`)
        ).then((response) => {
            return response.data;
        }).catch((err) => {
            throw new BadRequestException('Erro ao buscar cliente');
        });
    }

    async debitBalance(OriginClientAccount: string, targetClientBalance: string, amount: string) {

        return await firstValueFrom(
            this.httpService.patch(`${this.BaseUrlClient}account/debit`, {
                OriginClientAccount,
                targetClientBalance,
                amount
            })
        ).then((response) => {
            return response.data;
        }).catch((err) => {
            throw new BadRequestException('Erro ao buscar cliente');
        });

    }

    async processTransfer(event: eventData): Promise<void> {
        const { id, date, type, payload } = event

        const {
            amount,
            bankingAccountNumber,
            bankingAgencyNumber,
            description,
            senderClientId
        } = payload

        const { result } = await this.getDataClientById(senderClientId)

        const originClient = result
        const targetClient = await this.getDataClientByBankingData(bankingAccountNumber, bankingAgencyNumber)

        const amountTransfer = parseFloat(amount)
        const OriginClientBalance = parseFloat(originClient.Conta.saldo)
        const targetClientBalance = Number(targetClient.cliente.Conta.saldo).toFixed(2)

        if (originClient.id == targetClient.id) {
            throw new BadRequestException("Não é possivel transferir para a propria conta!");
        }

        if (OriginClientBalance < amountTransfer) {
            throw new BadRequestException("Não é possivel transferir saldo insuficiente !");
        }

        await this.debitBalance(originClient.Conta.id, targetClient.cliente.Conta.id, amount)

        let transaction = await this.repository.transacao.create({
            data: {
                id: id,
                conta_origem_id: originClient.Conta.id,
                conta_destino_id: targetClient.cliente.Conta.id,
                status: 'realizado',
                tipo: "TED",
                valor: amountTransfer,
                descricao: description ?? null
            }
        })

        if (transaction) {
            console.log("\nTransação finalizada com sucesso")
            console.log(`id: ${id}\n`)
        }
    }
}
