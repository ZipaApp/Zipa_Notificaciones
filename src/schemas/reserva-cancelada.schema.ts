import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'notificaciones_reserva_cancelada', timestamps: true })
export class NotificacionReservaCancelada extends Document {
  @Prop({ required: true })
  reservaId: string;

  @Prop({ required: true })
  mensaje: string;

  @Prop({ default: () => new Date().toISOString() })
  timestamp: string;
}

export const NotificacionReservaCanceladaSchema =
  SchemaFactory.createForClass(NotificacionReservaCancelada);

