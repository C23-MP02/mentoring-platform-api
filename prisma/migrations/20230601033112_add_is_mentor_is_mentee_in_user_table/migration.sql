-- AlterTable
ALTER TABLE `user` ADD COLUMN `is_mentee` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_mentor` BOOLEAN NOT NULL DEFAULT false;
