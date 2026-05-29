/*
  Warnings:

  - Added the required column `deskripsi` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `durasi` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gambar` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kategoriId` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `porsi` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `recipe` ADD COLUMN `deskripsi` VARCHAR(191) NOT NULL,
    ADD COLUMN `durasi` VARCHAR(191) NOT NULL,
    ADD COLUMN `gambar` VARCHAR(191) NOT NULL,
    ADD COLUMN `kategoriId` INTEGER NOT NULL,
    ADD COLUMN `porsi` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Recipe` ADD CONSTRAINT `Recipe_kategoriId_fkey` FOREIGN KEY (`kategoriId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
