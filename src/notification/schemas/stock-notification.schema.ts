import { Schema } from 'mongoose';
import { NotificationSchema } from './notification.schema';

export const StockNotificationSchema = new Schema({
  productoId: Number,
  almacenId: Number,
  cantidad: Number,
  minimo: Number,
});

