import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from './schemas/notification.schema';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { ChannelsService } from './channels/channels.service';
import { TemplatesService } from './templates/templates.service';
import { QueueService } from './queue/queue.service';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<Notification>,
    private readonly channelsService: ChannelsService,
    private readonly templatesService: TemplatesService,
    private readonly queueService: QueueService,
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    try {
      const template = await this.templatesService.renderTemplate(
        createNotificationDto.tipo,
        createNotificationDto.datos,
      );

      const notification = new this.notificationModel({
        Usu_id: createNotificationDto.Usu_id,
        Not_titulo: template.titulo,
        Not_mensaje: template.mensaje,
        Not_tipo: createNotificationDto.tipo,
      });

      await notification.save();

      // Enviar a cola
      await this.queueService.enqueue(notification);

      this.logger.log(`Notificación creada y enviada a cola: ${notification._id}`);
      return notification;
    } catch (error) {
      this.logger.error('Error creando notificación', error);
      throw error;
    }
  }

  async findAll(): Promise<Notification[]> {
    return this.notificationModel.find().sort({ Not_fecha: -1 }).exec();
  }

  async findByUser(Usu_id: string): Promise<Notification[]> {
    return this.notificationModel.find({ Usu_id }).sort({ Not_fecha: -1 }).exec();
  }

  async update(id: string, updateDto: UpdateNotificationDto) {
    return this.notificationModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  async markAsRead(id: string) {
    return this.notificationModel.findByIdAndUpdate(id, { Not_leida: true }, { new: true }).exec();
  }

  async delete(id: string) {
    return this.notificationModel.findByIdAndDelete(id).exec();
  }
}

