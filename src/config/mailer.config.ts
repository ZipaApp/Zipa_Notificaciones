import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

export const MailerConfig = MailerModule.forRootAsync({
  useFactory: (): MailerOptions => ({
    transport: {
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT || '587', 10),
      secure: process.env.MAIL_SECURE === 'true', // configurable
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    },
    defaults: {
      from: process.env.MAIL_DEFAULT_FROM || '"Zipa" <no-reply@Zipa.com>',
    },
    template: {
      dir: join(__dirname, '..', 'templates'),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  }),
});

