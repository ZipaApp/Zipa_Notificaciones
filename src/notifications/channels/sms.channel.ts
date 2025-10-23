// src/notifications/channels/sms.channel.ts
import { Injectable, Logger } from '@nestjs/common';
import { NotificationChannelInterface } from './base.channel';
import { SendNotificationDto } from '../dto/send-notification.dto';

@Injectable()
export class SmsChannel implements NotificationChannelInterface {
  private readonly logger = new Logger(SmsChannel.name);

  async send(notification: SendNotificationDto): Promise<void> {
    // Simulación del envío de SMS
    this.logger.log(
      `📲 SMS enviado a ${notification.userId}: ${notification.template}`,
    );
    // Aquí iría la integración con el proveedor SMS (Twilio, etc.)
  }
}

