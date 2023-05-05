/*
  Warnings:

  - You are about to drop the column `createdAt` on the `mentee` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `mentee` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `mentee` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `mentor` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `mentor` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `mentor` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `mentoring` table. All the data in the column will be lost.
  - You are about to drop the column `menteeId` on the `mentoring` table. All the data in the column will be lost.
  - You are about to drop the column `mentorId` on the `mentoring` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `mentoring` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `time` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `time` table. All the data in the column will be lost.
  - You are about to drop the column `timeId` on the `time` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `timeavailability` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `timeslot` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Mentee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Mentor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `Mentee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Mentor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mentee_id` to the `Mentoring` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mentor_id` to the `Mentoring` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_time` to the `Time` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `Time` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time_id` to the `Time` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `mentee` DROP FOREIGN KEY `Mentee_userId_fkey`;

-- DropForeignKey
ALTER TABLE `mentor` DROP FOREIGN KEY `Mentor_userId_fkey`;

-- DropForeignKey
ALTER TABLE `mentoring` DROP FOREIGN KEY `Mentoring_menteeId_fkey`;

-- DropForeignKey
ALTER TABLE `mentoring` DROP FOREIGN KEY `Mentoring_mentorId_fkey`;

-- DropForeignKey
ALTER TABLE `timeavailability` DROP FOREIGN KEY `TimeAvailability_timeSlotId_fkey`;

-- DropForeignKey
ALTER TABLE `timeavailability` DROP FOREIGN KEY `TimeAvailability_userId_fkey`;

-- DropForeignKey
ALTER TABLE `timeslot` DROP FOREIGN KEY `TimeSlot_timeId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_roleId_fkey`;

-- AlterTable
ALTER TABLE `mentee` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    DROP COLUMN `userId`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `mentor` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    DROP COLUMN `userId`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `mentoring` DROP COLUMN `createdAt`,
    DROP COLUMN `menteeId`,
    DROP COLUMN `mentorId`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `mentee_id` INTEGER NOT NULL,
    ADD COLUMN `mentor_id` INTEGER NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `time` DROP COLUMN `endTime`,
    DROP COLUMN `startTime`,
    DROP COLUMN `timeId`,
    ADD COLUMN `end_time` time NOT NULL,
    ADD COLUMN `start_time` time NOT NULL,
    ADD COLUMN `time_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `createdAt`,
    DROP COLUMN `roleId`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `role_id` INTEGER NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `timeavailability`;

-- DropTable
DROP TABLE `timeslot`;

-- CreateTable
CREATE TABLE `Time_Availability` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `time_slot_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Time_Slot` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `day` ENUM('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN') NOT NULL,
    `time_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Mentee_user_id_key` ON `Mentee`(`user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Mentor_user_id_key` ON `Mentor`(`user_id`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mentee` ADD CONSTRAINT `Mentee_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mentor` ADD CONSTRAINT `Mentor_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mentoring` ADD CONSTRAINT `Mentoring_mentee_id_fkey` FOREIGN KEY (`mentee_id`) REFERENCES `Mentee`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mentoring` ADD CONSTRAINT `Mentoring_mentor_id_fkey` FOREIGN KEY (`mentor_id`) REFERENCES `Mentor`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Time_Availability` ADD CONSTRAINT `Time_Availability_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Time_Availability` ADD CONSTRAINT `Time_Availability_time_slot_id_fkey` FOREIGN KEY (`time_slot_id`) REFERENCES `Time_Slot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Time_Slot` ADD CONSTRAINT `Time_Slot_time_id_fkey` FOREIGN KEY (`time_id`) REFERENCES `Time`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
