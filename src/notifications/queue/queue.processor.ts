// src/notifications/queue/queue.processor.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectAmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Connection } from 'amqplib';
import { NotificationsService } from '../notifications.service';

@Injectable()
export class QueueProcessor implements OnModuleInit {
  private readonly queueName = 'notifications_queue';

  constructor(
    @InjectAmqpConnection() private readonly connection: Connection,
    private readonly notificationsService: NotificationsService,
  ) {}

  async onModuleInit() {
    const channel = await this.connection.createChannel();
    await channel.assertQueue(this.queueName, { durable: true });

    console.log('Escuchando cola de notificaciones...');

    channel.consume(this.queueName, async (msg) => {
      if (!msg) return;

      try {
        const data = JSON.parse(msg.content.toString());
        console.log(`Mensaje recibido: ${data.event}`);

        await this.notificationsService.processNotification(data.event, data.payload);

        channel.ack(msg);
      } catch (err) {
        console.error('Error procesando mensaje:', err);
        channel.nack(msg, false, false);
      }
    });
  }
}

