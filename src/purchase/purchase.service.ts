import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PurchaseService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async hasAccess(
    userId: number,
    recipeId: number,
  ) {
    const payment =
      await this.prisma.payment.findFirst({
        where: {
          userId,
          recipeId,
          status: 'PAID',
        },
      });

    return !!payment;
  }
}