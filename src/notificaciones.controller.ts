import { Controller, Get } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificacionesService } from './notificaciones.service';

@Controller()
export class NotificacionesController {
  constructor(private readonly notificacionesService: NotificacionesService) {}

  // =====================================================
  // 📦 EVENTOS EXISTENTES
  // =====================================================
  @EventPattern('stock.bajo')
  async manejarStockBajo(@Payload() message: any) {
    const payload = message.data ?? message;
    await this.notificacionesService.registrarEvento(payload);
  }

  // =====================================================
  // 🐾 NUEVOS EVENTOS DE RESERVAS
  // =====================================================
  @EventPattern('reserva.creada')
  async manejarReservaCreada(@Payload() message: any) {
    await this.notificacionesService.guardarReservaCreada(message.data ?? message);
  }

  @EventPattern('reserva.cancelada')
  async manejarReservaCancelada(@Payload() message: any) {
    await this.notificacionesService.guardarReservaCancelada(message.data ?? message);
  }

  @EventPattern('reserva.completada')
  async manejarReservaCompletada(@Payload() message: any) {
    await this.notificacionesService.guardarReservaCompletada(message.data ?? message);
  }

  @EventPattern('reserva.proxima')
  async manejarReservaProxima(@Payload() message: any) {
    await this.notificacionesService.guardarReservaProxima(message.data ?? message);
  }

  @Get('notificaciones')
  async obtenerNotificaciones() {
    return this.notificacionesService.findAll();
  }
}

