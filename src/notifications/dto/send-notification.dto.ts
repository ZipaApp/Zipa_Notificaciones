// src/notifications/dto/send-notification.dto.ts
import { IsString, IsNotEmpty, IsObject, IsOptional, IsEnum } from 'class-validator';

export enum NotificationChannel {
  EMAIL = 'email',
  SMS = 'sms',
  WHATSAPP = 'whatsapp',
  PUSH = 'push',
}

export class SendNotificationDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  template: string; // nombre de la plantilla, ej: 'order-confirmation'

  @IsObject()
  @IsOptional()
  context?: Record<string, any>; // variables para la plantilla (nombre, producto, fecha...)

  @IsEnum(NotificationChannel)
  @IsOptional()
  channel?: NotificationChannel;

  @IsString()
  @IsOptional()
  subject?: string; // asunto opcional del correo
}

