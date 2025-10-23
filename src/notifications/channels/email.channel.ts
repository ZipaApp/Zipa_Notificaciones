// src/notifications/channels/email.channel.ts
import { Injectable, Logger } from '@nestjs/common';
import { NotificationChannelInterface } from './base.channel';
import { SendNotificationDto } from '../dto/send-notification.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailChannel implements NotificationChannelInterface {
  private readonly logger = new Logger(EmailChannel.name);

  constructor(private readonly mailerService: MailerService) {}

  async send(notification: SendNotificationDto): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: notification.userId, // en producción debería ser el correo del usuario
        subject: notification.subject || 'Notificación del sistema',
        template: notification.template, // nombre del archivo de plantilla (ej. order-confirmation)
        context: notification.context || {}, // variables dinámicas para la plantilla
      });

      this.logger.log(`Correo enviado a ${notification.userId}`);
    } catch (error) {
      this.logger.error(`Error al enviar correo: ${error.message}`);
      throw error;
    }
  }
}

