import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  // User buat payment - otomatis SUCCESS
  async create(data: {
    userId: number;
    recipeId: number;
    metode: string;
    jumlah: number;
    buktiTransfer?: string;
  }) {
    const payment = await this.prisma.payment.create({
      data: {
        ...data,
        status: 'SUCCESS', // ← langsung success
      },
    });

    // Otomatis buat Purchase
    await this.prisma.purchase.upsert({
      where: {
        userId_recipeId: {
          userId: payment.userId,
          recipeId: payment.recipeId,
        },
      },
      update: {},
      create: {
        userId: payment.userId,
        recipeId: payment.recipeId,
      },
    });

    return payment;
  }

  // GET ALL - untuk admin
  findAll() {
    return this.prisma.payment.findMany({
      include: { user: true, recipe: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  // GET BY USER
  findByUser(userId: number) {
    return this.prisma.payment.findMany({
      where: { userId },
      include: { recipe: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  // ADMIN konfirmasi payment → status SUCCESS → buat Purchase
  async confirm(id: number) {
    const payment = await this.prisma.payment.update({
      where: { id },
      data: { status: 'SUCCESS' },
    });

    await this.prisma.purchase.upsert({
      where: {
        userId_recipeId: {
          userId: payment.userId,
          recipeId: payment.recipeId,
        },
      },
      update: {},
      create: {
        userId: payment.userId,
        recipeId: payment.recipeId,
      },
    });

    return payment;
  }

  // ADMIN tolak payment
  reject(id: number) {
    return this.prisma.payment.update({
      where: { id },
      data: { status: 'REJECTED' },
    });
  }

  // Hapus payment
  remove(id: number) {
    return this.prisma.payment.delete({ where: { id } });
  }
}