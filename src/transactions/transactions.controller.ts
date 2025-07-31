import { Controller, Get, Param } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {

    constructor(
        private readonly service: TransactionsService
    ) { }

    @Get('client/:id')
    async getTransfers(@Param('id') id: string) {
        return await this.service.findTransactionsByOriginClientId(id)
    }
        
    @Get('/:id')
    async getTransferDetails(@Param('id') id: string) {
        return await this.service.findTransactionById(id)
    }
}
