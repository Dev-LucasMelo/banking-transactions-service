import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, EventPattern, KafkaContext, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @EventPattern('topic')
  getHello(@Payload() message: any, @Ctx() context: KafkaContext) {
    const originalMessage = context.getMessage();
    const partition = context.getPartition();

    console.log('Mensagem recebida no tópico "topic":', message);
    console.log('Partition:', partition);
    console.log('Headers:', originalMessage.headers);
  }
}
