# Banking-transactions-service

## Descrição

- Este serviço é responsável pelas operações na entidade de transacao, ele possui uma comunicação mista, ou seja tanto http como assíncrona via kafka. 


- Foi utilizado a comunicação assincrona apenas para pontos críticos da aplicação (as que lidam com muito fluxo de dados e processamento longo através de diversos serviços e interfaces)

- O serviço possui modulos http e modulos consumer para separar a responsabilidade, os modulos http são usados para operações simples de crud, já os modulos consumer são os workers assincronos onde recebem um evento e chamam serviços externos para processar dados e realizam validações mais complexas para o sucesso da operação. 

## Tecnologias utilizadas

- NestJS (TypeScript)

- Docker / Docker Compose

- postgres

- Prisma (ORM)

- KAFKA

## Arquitetura do serviço

- Esse serviço utiliza a arquitetura modular baseada no domínio (padrão nest) provomento uma boa escalabilidade da aplicação com modulos desacoplados. 

## Comunicação entre os serviços

- HTTP: O banking-transactions-service Expoe interfaces para serem consumidas por outros serviços de forma eficiente, e consome interfaces de outros serviços. 

- KAFKA: Escuta eventos emitidos e processa utilizando de suas próprias interfaces ou interfaces de outros serviços. 

## Swagger

- link 

## Inicialização da aplicação 
 
### 1. Requisitos  
 - docker
 - docker compose
### 2. Estrutura de rede
 - Foi utilizado uma rede personalizada no docker chamada <strong> loomi_network</strong> para comunicação entre os containers essa rede faz com que todos os arquivos docker-compose.yml se conectem de forma eficiente favorecendo a arquitetura distribuida.  
 
### 3. Como iniciar o projeto

 1. Clonar o projeto

  ```bash
  git clone https://github.com/Dev-LucasMelo/banking-transactions-service.git
  ```
 2. Acessar diretorio 
  
  ```bash
  cd banking-transactions-service
  ```

3. iniciar contêineres com Docker Compose:
 
  ```bash
  docker-compose up --build
  ```

4. Acessar interface: 

  ```bash
  http://localhost:6000/
  ```

### Observação Importante
- É necessário garantir que a rede local <strong> loomi_network</strong> exista, para criar a rede basta rodar no terminal: 

  ```bash
  docker network create --driver bridge loomi_network
  ```