import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { Notification, NotificationSchema } from './schemas/notification.schema';
import { NotificationService } from './notification.service';

@Module({
  imports: [
    ScheduleModule.forRoot(), 
    MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }]),
  ],
  providers: [NotificationService],
})
export class NotificationModule {}

