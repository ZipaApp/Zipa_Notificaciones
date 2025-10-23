import { Injectable } from '@nestjs/common';
import { NotificationQueue } from '../queue/notification.queue';

@Injectable()
export class OrderListener {
  constructor(private readonly notificationQueue: NotificationQueue) {}

  async handleOrderStatusChange(order: any) {
    await this.notificationQueue.publish('order.status', {
      userId: order.userId,
      orderId: order.id,
      status: order.status,
      message: `Tu pedido cambió de estado a ${order.status}`,
    });
  }
}

