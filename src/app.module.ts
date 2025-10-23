import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsModule } from './notifications/notifications.module';
import { RabbitMQConfig } from './config/rabbitmq.config';
import { MongoConfig } from './config/mongo.config';
import { MailerConfig } from './config/mailer.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: MongoConfig.uri,
      }),
    }),
    NotificationsModule,
  ],
})
export class AppModule {}

