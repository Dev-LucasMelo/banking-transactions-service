import { clientData, conta } from "src/transactions-consumer/types/client.types"

type ContaWithoutSaldo = Omit<conta, 'saldo'>;

type ClientDataWithoutSaldo = Omit<clientData, 'Conta'> & {
  Conta: ContaWithoutSaldo;
};

export type responseTransactionDetails = {
    id: string
    tipo: string
    valor: string
    descricao: string | null
    status: string
    cliente_origem: ClientDataWithoutSaldo
    cliente_destino: ClientDataWithoutSaldo
}
