import { Injectable,UnauthorizedException,} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException(
        'Email tidak ditemukan',
      );
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password,
    );

    if (!validPassword) {
      throw new UnauthorizedException(
        'Password salah',
      );
    }
    const { password: _, ...userWithoutPassword } = user;

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
    message: 'Login berhasil',
    access_token: this.jwtService.sign(payload),
    user: userWithoutPassword, // Sekarang password tidak akan ikut terkirim ke Postman
    };
    }
  }
