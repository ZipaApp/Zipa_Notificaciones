import { ClientsModule, Transport } from '@nestjs/microservices';

export const RabbitMQConfig = ClientsModule.register([
  {
    name: 'NOTIFICATIONS_SERVICE',
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL], // se definirá en docker-compose.yml
      queue: process.env.RABBITMQ_QUEUE || 'notifications_queue',
      queueOptions: {
        durable: true,
      },
    },
  },
]);

