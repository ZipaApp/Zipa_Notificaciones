import { Injectable } from '@nestjs/common';
import { NotificationQueue } from '../queue/notification.queue';

@Injectable()
export class UserListener {
  constructor(private readonly notificationQueue: NotificationQueue) {}

  async handleUserRegistered(user: any) {
    await this.notificationQueue.publish('user.welcome', {
      userId: user.id,
      email: user.email,
      userName: user.fullName,
    });
  }
}

