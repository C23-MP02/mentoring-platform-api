/*
  Warnings:

  - You are about to drop the column `name` on the `time` table. All the data in the column will be lost.
  - You are about to drop the `time_slot2` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `end_time` to the `Time` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `Time` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `time_availability` DROP FOREIGN KEY `Time_Availability_time_Slot2Id_fkey`;

-- DropForeignKey
ALTER TABLE `time_slot2` DROP FOREIGN KEY `Time_Slot2_time_id_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_gender_id_fkey`;

-- AlterTable
ALTER TABLE `time` DROP COLUMN `name`,
    ADD COLUMN `end_time` VARCHAR(191) NOT NULL,
    ADD COLUMN `start_time` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `phone` VARCHAR(191) NULL,
    MODIFY `gender_id` INTEGER NULL;

-- DropTable
DROP TABLE `time_slot2`;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_gender_id_fkey` FOREIGN KEY (`gender_id`) REFERENCES `Gender`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
