import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RecipesModule } from './recipes/recipes.module';
import { CategoriesModule } from './categories/categories.module';
import { FavoritesModule } from './favorites/favorites.module';
import { PaymentModule } from './payment/payment.module';
import { PurchaseModule } from './purchase/purchase.module';

@Module({
  imports: [PrismaModule,AuthModule,UsersModule,RecipesModule, CategoriesModule, FavoritesModule,PaymentModule,
  PurchaseModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}