import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'notificaciones_reserva_creada', timestamps: true })
export class NotificacionReservaCreada extends Document {
  @Prop({ required: true })
  reservaId: string;

  @Prop({ required: true })
  mascotaId: string;

  @Prop({ required: true })
  nombreMascota: string;

  @Prop({ required: true })
  tipoServicio: string;

  @Prop({ required: true })
  fecha: string;

  @Prop({ required: true })
  horaInicio: string;

  @Prop({ default: () => new Date().toISOString() })
  timestamp: string;
}

export const NotificacionReservaCreadaSchema =
  SchemaFactory.createForClass(NotificacionReservaCreada);

