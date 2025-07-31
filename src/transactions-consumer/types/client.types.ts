type conta = {
    id: string
    numero_conta: string
    agencia: string
    saldo: string
}

export type clientData = {
    id: string 
    nome_completo: string 
    email: string 
    url_perfil: string 
    Conta: conta
}

