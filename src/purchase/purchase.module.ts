import { Module } from '@nestjs/common';

import { PurchaseService } from './purchase.service';

import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [
    PurchaseService,
    PrismaService,
  ],

  exports: [PurchaseService],
})
export class PurchaseModule {}