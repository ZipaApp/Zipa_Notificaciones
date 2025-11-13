import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificacionesService } from './notificaciones.service';
import { NotificacionesController } from './notificaciones.controller';
import { Notificacion, NotificacionSchema } from './schemas/notificacion.schema';
import { NotificacionReservaCreada, NotificacionReservaCreadaSchema } from './schemas/reserva-creada.schema';
import { NotificacionReservaCancelada, NotificacionReservaCanceladaSchema } from './schemas/reserva-cancelada.schema';
import { NotificacionReservaCompletada, NotificacionReservaCompletadaSchema } from './schemas/reserva-completada.schema';
import { NotificacionReservaProxima, NotificacionReservaProximaSchema } from './schemas/reserva-proxima.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/notificaciones_db'),
    MongooseModule.forFeature([
      { name: Notificacion.name, schema: NotificacionSchema },
      { name: NotificacionReservaCreada.name, schema: NotificacionReservaCreadaSchema },
      { name: NotificacionReservaCancelada.name, schema: NotificacionReservaCanceladaSchema },
      { name: NotificacionReservaCompletada.name, schema: NotificacionReservaCompletadaSchema },
      { name: NotificacionReservaProxima.name, schema: NotificacionReservaProximaSchema },
    ]),
  ],
  controllers: [NotificacionesController],
  providers: [NotificacionesService],
})
export class NotificacionesModule {}

