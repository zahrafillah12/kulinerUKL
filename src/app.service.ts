import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Backend Website Resep Kuliner Tradisional Berjalan!';
  }
}