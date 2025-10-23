// src/notifications/queue/notification.queue.ts
import { Injectable } from '@nestjs/common';
import { InjectAmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Connection } from 'amqplib';

@Injectable()
export class NotificationQueue {
  private readonly queueName = 'notifications_queue';

  constructor(@InjectAmqpConnection() private readonly connection: Connection) {}

  async publish(event: string, payload: any) {
    const channel = await this.connection.createChannel();
    await channel.assertQueue(this.queueName, { durable: true });

    const message = {
      event,
      timestamp: new Date(),
      payload,
    };

    channel.sendToQueue(this.queueName, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });

    console.log(`📨 Mensaje enviado a cola: ${event}`);
    await channel.close();
  }
}

