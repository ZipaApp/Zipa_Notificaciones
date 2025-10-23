import { Injectable } from '@nestjs/common';
import { NotificationQueue } from '../queue/notification.queue';

@Injectable()
export class ServiceListener {
  constructor(private readonly notificationQueue: NotificationQueue) {}

  async handleServiceReminder(reservation: any) {
    await this.notificationQueue.publish('service.reminder', {
      userId: reservation.userId,
      serviceType: reservation.serviceType,
      petName: reservation.petName,
      date: reservation.date,
      time: reservation.time,
    });
  }
}

