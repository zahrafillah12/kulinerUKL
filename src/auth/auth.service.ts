import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginDto.email,
      },
    });

    if (!user) {
      return {
        message: 'Email tidak ditemukan',
      };
    }

    if (user.password !== loginDto.password) {
      return {
        message: 'Password salah',
      };
    }

    return {
      message: 'Login berhasil',

      user,
    };
  }
}