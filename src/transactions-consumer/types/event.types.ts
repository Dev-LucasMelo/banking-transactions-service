
type payload = {
    senderClientId: string
    bankingAccountNumber: string
    bankingAgencyNumber: string
    amount: string
    description: string
}

export type eventData = {
    id: string
    type: string
    date: string
    payload: payload
}

