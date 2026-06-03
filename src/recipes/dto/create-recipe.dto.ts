import { IsString, IsInt, IsOptional, Min } from 'class-validator';
export class CreateRecipeDto {
  @IsString()
  namaMakanan!: string;
  @IsString()
  daerahAsal!: string;
  @IsString()
  gambar!: string;
  @IsString()
  deskripsi!: string;
  @IsString()
  bahan!: string;
  @IsString()
  langkahPembuatan!: string;
  @IsString()
  durasi!: string;
  @IsString()
  porsi!: string;
  @IsInt()
  userId!: number;
  @IsInt()
  kategoriId!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  price?: number;   // <-- tambahkan ini
}