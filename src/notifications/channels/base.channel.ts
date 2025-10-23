// src/notifications/channels/base.channel.ts
import { SendNotificationDto } from '../dto/send-notification.dto';

export interface NotificationChannelInterface {
  send(notification: SendNotificationDto): Promise<void>;
}

