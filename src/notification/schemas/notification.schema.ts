import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, discriminatorKey: 'tipo' })
export class Notification extends Document {
  @Prop({ required: true })
  tipo: string;

  @Prop({ required: true })
  mensaje: string;

  @Prop({ default: false })
  leida: boolean;

  @Prop({ type: Object })
  datos: Record<string, any>;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

