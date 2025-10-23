// src/notifications/channels/whatsapp.channel.ts
import { Injectable, Logger } from '@nestjs/common';
import { NotificationChannelInterface } from './base.channel';
import { SendNotificationDto } from '../dto/send-notification.dto';

@Injectable()
export class WhatsappChannel implements NotificationChannelInterface {
  private readonly logger = new Logger(WhatsappChannel.name);

  async send(notification: SendNotificationDto): Promise<void> {
    this.logger.log(
      `💬 WhatsApp enviado a ${notification.userId} con plantilla ${notification.template}`,
    );
    // Aquí iría la lógica real de conexión a la API de WhatsApp Cloud
  }
}

