import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, Min } from 'class-validator';

export class CreateRecipeDto {
  @ApiProperty({ example: 'Rendang' })
  @IsString()
  namaMakanan!: string;

  @ApiProperty({ example: 'Sumatera Barat' })
  @IsString()
  daerahAsal!: string;

  @ApiProperty({ example: 'https://...' })
  @IsString()
  gambar!: string;

  @ApiProperty({ example: 'Rendang daging sapi khas Minang' })
  @IsString()
  deskripsi!: string;

  @ApiProperty({ example: '500gr daging sapi, santan...' })
  @IsString()
  bahan!: string;

  @ApiProperty({ example: '1. Haluskan bumbu...' })
  @IsString()
  langkahPembuatan!: string;

  @ApiProperty({ example: '60 menit' })
  @IsString()
  durasi!: string;

  @ApiProperty({ example: '4 porsi' })
  @IsString()
  porsi!: string;

  @ApiProperty({ example: 15 })
  @IsInt()
  userId!: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  kategoriId!: number;

  @ApiProperty({ example: 0, required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  harga?: number;

  @ApiProperty({ example: 0, required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  price?: number;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  isPremium?: boolean;
}