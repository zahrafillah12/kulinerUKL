import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PaymentsService } from './payment.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // User buat payment
  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() body: {
    userId: number;
    recipeId: number;
    metode: string;
    jumlah: number;
    buktiTransfer?: string;
  }) {
    return this.paymentsService.create(body);
  }

  // Admin lihat semua payment
  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  findAll() {
    return this.paymentsService.findAll();
  }

  // User lihat payment miliknya
  @Get('user/:userId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  findByUser(@Param('userId') userId: string) {
    return this.paymentsService.findByUser(Number(userId));
  }

  // Admin konfirmasi payment
  @Patch(':id/confirm')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  confirm(@Param('id') id: string) {
    return this.paymentsService.confirm(Number(id));
  }

  // Admin tolak payment
  @Patch(':id/reject')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  reject(@Param('id') id: string) {
    return this.paymentsService.reject(Number(id));
  }

  // Hapus payment
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(Number(id));
  }
}