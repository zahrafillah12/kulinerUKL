import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';

@Controller('payments')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
  ) {}

  @Post()
  create(
    @Body()
    createPaymentDto: CreatePaymentDto,
  ) {
    return this.paymentService.create(
      createPaymentDto,
    );
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Post(':id/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination:
          './uploads/payments',

        filename: (
          req,
          file,
          cb,
        ) => {
          const filename =
            Date.now() +
            '-' +
            file.originalname;

          cb(null, filename);
        },
      }),
    }),
  )
  uploadBukti(
    @Param('id') id: string,

    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.paymentService.uploadBukti(
      Number(id),
      file.filename,
    );
  }

  @Patch(':id/approve')
  approve(
    @Param('id') id: string,
  ) {
    return this.paymentService.approve(
      Number(id),
    );
  }
}