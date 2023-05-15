/*
  Warnings:

  - You are about to drop the column `description` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `description`,
    ADD COLUMN `bio` VARCHAR(191) NULL,
    ADD COLUMN `profile_picture_url` VARCHAR(191) NULL;