import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Seed Admin
  const hashedPassword = await bcrypt.hash('admin123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      nama: 'Administrator',
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  // Seed Category
  await prisma.category.createMany({
    data: [
      { nama: 'Makanan Berat' },
      { nama: 'Makanan Ringan' },
      { nama: 'Minuman' },
      { nama: 'Dessert' },
    ],
    skipDuplicates: true,
  });

  console.log('Seed berhasil!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());