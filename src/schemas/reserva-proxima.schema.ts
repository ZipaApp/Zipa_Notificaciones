import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'notificaciones_reserva_proxima', timestamps: true })
export class NotificacionReservaProxima extends Document {
  @Prop({ required: true })
  reservaId: string;

  @Prop({ required: true })
  mascotaId: string;

  @Prop({ required: true })
  tipoServicio: string;

  @Prop({ required: true })
  fecha: string;

  @Prop({ required: true })
  mensaje: string;

  @Prop({ default: () => new Date().toISOString() })
  timestamp: string;
}

export const NotificacionReservaProximaSchema =
  SchemaFactory.createForClass(NotificacionReservaProxima);

