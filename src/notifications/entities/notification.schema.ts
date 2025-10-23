// src/notifications/schemas/notification.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema({ collection: 'notifications', timestamps: true })
export class Notification {
  @Prop({ required: true })
  userId: string; // id del usuario receptor

  @Prop({ required: true })
  title: string; // título de la notificación

  @Prop({ required: true })
  message: string; // mensaje principal

  @Prop({ default: 'general' })
  type: string; // confirmación, alerta, promoción, etc.

  @Prop({ default: 'email' })
  channel: string; // email, sms, whatsapp, push, etc.

  @Prop({ default: false })
  read: boolean; // estado de lectura
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

