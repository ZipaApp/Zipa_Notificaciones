import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notificacion } from './schemas/notificacion.schema';
import { NotificacionReservaCreada } from './schemas/reserva-creada.schema';
import { NotificacionReservaCancelada } from './schemas/reserva-cancelada.schema';
import { NotificacionReservaCompletada } from './schemas/reserva-completada.schema';
import { NotificacionReservaProxima } from './schemas/reserva-proxima.schema';

@Injectable()
export class NotificacionesService {
  private readonly logger = new Logger(NotificacionesService.name);

  constructor(
    @InjectModel(Notificacion.name)
    private readonly notificacionModel: Model<Notificacion>,
    @InjectModel(NotificacionReservaCreada.name)
    private readonly reservaCreadaModel: Model<NotificacionReservaCreada>,
    @InjectModel(NotificacionReservaCancelada.name)
    private readonly reservaCanceladaModel: Model<NotificacionReservaCancelada>,
    @InjectModel(NotificacionReservaCompletada.name)
    private readonly reservaCompletadaModel: Model<NotificacionReservaCompletada>,
    @InjectModel(NotificacionReservaProxima.name)
    private readonly reservaProximaModel: Model<NotificacionReservaProxima>,
  ) {}

  // ===========================================
  // EVENTO EXISTENTE: stock.bajo
  // ===========================================
  async registrarEvento(data: any) {
    this.logger.log(`📩 Evento stock.bajo: ${JSON.stringify(data)}`);
    const notificacion = new this.notificacionModel({
      type: 'stock.bajo',
      ...data,
      timestamp: data.timestamp ?? new Date().toISOString(),
    });
    await notificacion.save();
    return notificacion;
  }

  // ===========================================
  // NUEVOS EVENTOS DE RESERVAS
  // ===========================================
  async guardarReservaCreada(data: any) {
    this.logger.log(`🟢 Evento reserva.creada: ${JSON.stringify(data)}`);
    const doc = new this.reservaCreadaModel(data);
    return doc.save();
  }

  async guardarReservaCancelada(data: any) {
    this.logger.log(`🔴 Evento reserva.cancelada: ${JSON.stringify(data)}`);
    const doc = new this.reservaCanceladaModel(data);
    return doc.save();
  }

  async guardarReservaCompletada(data: any) {
    this.logger.log(`🟣 Evento reserva.completada: ${JSON.stringify(data)}`);
    const doc = new this.reservaCompletadaModel(data);
    return doc.save();
  }

  async guardarReservaProxima(data: any) {
    this.logger.log(`🟠 Evento reserva.proxima: ${JSON.stringify(data)}`);
    const doc = new this.reservaProximaModel(data);
    return doc.save();
  }

  // ===========================================
  async findAll() {
    return {
      stock: await this.notificacionModel.find().sort({ createdAt: -1 }).exec(),
      reservas: {
        creadas: await this.reservaCreadaModel.find().sort({ createdAt: -1 }).exec(),
        canceladas: await this.reservaCanceladaModel.find().sort({ createdAt: -1 }).exec(),
        completadas: await this.reservaCompletadaModel.find().sort({ createdAt: -1 }).exec(),
        proximas: await this.reservaProximaModel.find().sort({ createdAt: -1 }).exec(),
      },
    };
  }
}

