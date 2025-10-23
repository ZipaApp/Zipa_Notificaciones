// src/notifications/dto/create-notification.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsOptional()
  type?: string; // ejemplo: 'alerta', 'promoción', 'recordatorio'

  @IsString()
  @IsOptional()
  channel?: string; // email, sms, push, whatsapp

  @IsBoolean()
  @IsOptional()
  read?: boolean;
}

