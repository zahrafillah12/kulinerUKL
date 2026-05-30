-- DropForeignKey
ALTER TABLE `favorite` DROP FOREIGN KEY `Favorite_recipeId_fkey`;

-- DropForeignKey
ALTER TABLE `recipe` DROP FOREIGN KEY `Recipe_kategoriId_fkey`;

-- AddForeignKey
ALTER TABLE `Recipe` ADD CONSTRAINT `Recipe_kategoriId_fkey` FOREIGN KEY (`kategoriId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
