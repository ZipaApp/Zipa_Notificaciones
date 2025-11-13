import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'notificaciones', timestamps: true })
export class Notificacion extends Document {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  productoId: number;

  @Prop({ required: true })
  almacenId: number;

  @Prop({ required: true })
  cantidad: number;

  @Prop({ required: true })
  minimo: number;

  // ✅ Usa función en lugar de valor directo para evitar que todos tengan el mismo timestamp
  @Prop({ default: () => new Date().toISOString() })
  timestamp: string;
}

export const NotificacionSchema = SchemaFactory.createForClass(Notificacion);

