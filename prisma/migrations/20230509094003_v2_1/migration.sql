/*
  Warnings:

  - You are about to drop the column `mentee_id` on the `mentoring` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `mentoring` DROP FOREIGN KEY `Mentoring_mentee_id_fkey`;

-- AlterTable
ALTER TABLE `mentoring` DROP COLUMN `mentee_id`;

-- CreateTable
CREATE TABLE `Mentoring_Attendee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mentoring_id` INTEGER NOT NULL,
    `mentee_id` INTEGER NOT NULL,
    `rating` INTEGER NOT NULL,
    `feedback` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Mentoring_Attendee` ADD CONSTRAINT `Mentoring_Attendee_mentoring_id_fkey` FOREIGN KEY (`mentoring_id`) REFERENCES `Mentoring`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mentoring_Attendee` ADD CONSTRAINT `Mentoring_Attendee_mentee_id_fkey` FOREIGN KEY (`mentee_id`) REFERENCES `Mentee`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
