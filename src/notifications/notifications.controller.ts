import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async create(@Body() dto: CreateNotificationDto) {
    return this.notificationsService.create(dto);
  }

  @Get()
  async findAll() {
    return this.notificationsService.findAll();
  }

  @Get('user/:Usu_id')
  async findByUser(@Param('Usu_id') Usu_id: string) {
    return this.notificationsService.findByUser(Usu_id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateNotificationDto) {
    return this.notificationsService.update(id, dto);
  }

  @Patch(':id/read')
  async markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.notificationsService.delete(id);
  }
}

