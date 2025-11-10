import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { Notification } from './schemas/notification.schema';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<Notification>,
  ) {}

  // 🧾 Evento: stock bajo
  @EventPattern('stock.bajo')
  async handleStockBajo(@Payload() data: any, @Ctx() context: RmqContext) {
    const { data: stockData } = data;
    this.logger.warn(`⚠️ Stock bajo detectado: ${JSON.stringify(stockData)}`);

    const mensaje = `El producto ${stockData.productoId} tiene stock bajo en el almacén ${stockData.almacenId}.`;

    await this.notificationModel.create({
      tipo: 'stock.bajo',
      mensaje,
      datos: stockData,
    });

    this.ackMessage(context);
  }

  // 🐾 Evento: reserva creada
  @EventPattern('reserva.creada')
  async handleReservaCreada(@Payload() payload: any, @Ctx() context: RmqContext) {
    const { data } = payload;
    this.logger.log(`📅 Reserva creada recibida: ${JSON.stringify(data)}`);

    const mensaje = `Tu reserva para ${data.tipoServicio} está confirmada el ${data.fecha} a las ${data.horaInicio}.`;

    await this.notificationModel.create({
      tipo: 'reserva.creada',
      mensaje,
      datos: data,
    });

    this.ackMessage(context);
  }

  // ⏰ Evento: reserva próxima
  @EventPattern('reserva.proxima')
  async handleReservaProxima(@Payload() payload: any, @Ctx() context: RmqContext) {
    const { data } = payload;
    this.logger.log(`⏰ Recordatorio de reserva recibida: ${JSON.stringify(data)}`);

    const mensaje = data.mensaje || `Recordatorio: tu cita para ${data.tipoServicio} es el ${data.fecha}.`;

    await this.notificationModel.create({
      tipo: 'reserva.proxima',
      mensaje,
      datos: data,
    });

    this.ackMessage(context);
  }

  // 📨 Confirmar recepción del mensaje en RabbitMQ
  private ackMessage(context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
  }

  async findAll() {
    return this.notificationModel.find().sort({ createdAt: -1 });
  }
}

