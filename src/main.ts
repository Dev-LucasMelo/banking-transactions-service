import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'transactions-service-consumer',
        brokers: [process.env.KAFKA_BROKER || 'kafka:9092'],
        retry: {
          initialRetryTime: 300,
          retries: 5,
          restartOnFailure: async () => false, 
        },
      },
      consumer: {
        groupId: 'transactions-consumer',
      },
      run: { 
        autoCommit: false 
      }

    },
  });

  await app.startAllMicroservices();

  app.enableCors();
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
