-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_gender_id_fkey`;

-- AlterTable
ALTER TABLE `user` MODIFY `gender_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_gender_id_fkey` FOREIGN KEY (`gender_id`) REFERENCES `Gender`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
