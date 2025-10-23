import { Injectable } from '@nestjs/common';
import { NotificationQueue } from '../queue/notification.queue';

@Injectable()
export class InventoryListener {
  constructor(private readonly notificationQueue: NotificationQueue) {}

  async handleLowStock(product: any) {
    await this.notificationQueue.publish('inventory.alert', {
      admin: true,
      productName: product.name,
      stock: product.stock,
    });
  }
}

