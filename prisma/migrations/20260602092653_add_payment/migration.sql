/*
  Warnings:

  - You are about to drop the column `amount` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `method` on the `payment` table. All the data in the column will be lost.
  - Added the required column `jumlah` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metode` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_recipeId_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_userId_fkey`;

-- AlterTable
ALTER TABLE `payment` DROP COLUMN `amount`,
    DROP COLUMN `method`,
    ADD COLUMN `buktiTransfer` VARCHAR(191) NULL,
    ADD COLUMN `jumlah` INTEGER NOT NULL,
    ADD COLUMN `metode` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `recipe` MODIFY `harga` INTEGER NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
