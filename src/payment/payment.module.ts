import { Module } from '@nestjs/common';
import { PaymentsController } from './payment.controller';
import { PaymentsService } from './payment.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService,PrismaService,],
})
export class PaymentModule {}