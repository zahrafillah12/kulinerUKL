export class CreatePaymentDto {
userId!: number;
  recipeId!: number;

  metode!: string; // QRIS atau TRANSFER

  jumlah!: number;
}