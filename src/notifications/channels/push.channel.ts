// src/notifications/channels/push.channel.ts
import { Injectable, Logger } from '@nestjs/common';
import { NotificationChannelInterface } from './base.channel';
import { SendNotificationDto } from '../dto/send-notification.dto';

@Injectable()
export class PushChannel implements NotificationChannelInterface {
  private readonly logger = new Logger(PushChannel.name);

  async send(notification: SendNotificationDto): Promise<void> {
    this.logger.log(
      `🔔 Push enviado a ${notification.userId}: ${notification.template}`,
    );
    // Aquí se integraría con Firebase o OneSignal
  }
}

