import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(
    private prisma: PrismaService,
  ) {}

  create(data: any) {
    return this.prisma.payment.create({
      data,
    });
  }

  findAll() {
    return this.prisma.payment.findMany({
      include: {
        user: true,
        recipe: true,
      },
    });
  }

  uploadBukti(
    id: number,
    filename: string,
  ) {
    return this.prisma.payment.update({
      where: { id },

      data: {
        buktiTransfer:
          `/uploads/payments/${filename}`,
      },
    });
  }

  approve(id: number) {
    return this.prisma.payment.update({
      where: { id },

      data: {
        status: 'PAID',
      },
    });
  }
}