import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'notificaciones_reserva_completada', timestamps: true })
export class NotificacionReservaCompletada extends Document {
  @Prop({ required: true })
  reservaId: string;

  @Prop({ required: true })
  mensaje: string;

  @Prop({ default: () => new Date().toISOString() })
  timestamp: string;
}

export const NotificacionReservaCompletadaSchema =
  SchemaFactory.createForClass(NotificacionReservaCompletada);

