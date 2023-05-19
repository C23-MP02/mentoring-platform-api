/*
  Warnings:

  - You are about to drop the `time` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `time_availability` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `time_slot` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `time_availability` DROP FOREIGN KEY `Time_Availability_time_slot_id_fkey`;

-- DropForeignKey
ALTER TABLE `time_availability` DROP FOREIGN KEY `Time_Availability_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `time_slot` DROP FOREIGN KEY `Time_Slot_time_id_fkey`;

-- AlterTable
ALTER TABLE `mentoring_attendee` ADD COLUMN `en_feedback` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `time`;

-- DropTable
DROP TABLE `time_availability`;

-- DropTable
DROP TABLE `time_slot`;
