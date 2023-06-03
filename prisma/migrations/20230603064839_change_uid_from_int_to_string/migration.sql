/*
  Warnings:

  - The primary key for the `mentoring_attendee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `provider_id` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `mentee` DROP FOREIGN KEY `Mentee_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `mentor` DROP FOREIGN KEY `Mentor_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `mentoring` DROP FOREIGN KEY `Mentoring_mentor_id_fkey`;

-- DropForeignKey
ALTER TABLE `mentoring_attendee` DROP FOREIGN KEY `Mentoring_Attendee_mentee_id_fkey`;

-- AlterTable
ALTER TABLE `mentee` MODIFY `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `mentor` MODIFY `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `mentoring` MODIFY `mentor_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `mentoring_attendee` DROP PRIMARY KEY,
    MODIFY `mentee_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`mentoring_id`, `mentee_id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `provider_id`,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `User_id_key` ON `User`(`id`);

-- AddForeignKey
ALTER TABLE `Mentee` ADD CONSTRAINT `Mentee_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mentor` ADD CONSTRAINT `Mentor_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mentoring` ADD CONSTRAINT `Mentoring_mentor_id_fkey` FOREIGN KEY (`mentor_id`) REFERENCES `Mentor`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mentoring_Attendee` ADD CONSTRAINT `Mentoring_Attendee_mentee_id_fkey` FOREIGN KEY (`mentee_id`) REFERENCES `Mentee`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
