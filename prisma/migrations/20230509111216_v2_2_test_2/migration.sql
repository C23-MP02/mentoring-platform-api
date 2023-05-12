/*
  Warnings:

  - You are about to drop the column `time_id` on the `time` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `time` DROP COLUMN `time_id`;

-- AlterTable
ALTER TABLE `time_availability` ADD COLUMN `time_Slot2Id` INTEGER NULL;

-- CreateTable
CREATE TABLE `Time_Slot2` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `day` ENUM('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN') NOT NULL,
    `time_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Time_Availability` ADD CONSTRAINT `Time_Availability_time_Slot2Id_fkey` FOREIGN KEY (`time_Slot2Id`) REFERENCES `Time_Slot2`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Time_Slot2` ADD CONSTRAINT `Time_Slot2_time_id_fkey` FOREIGN KEY (`time_id`) REFERENCES `Time`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
