-- AlterTable
ALTER TABLE `user` ADD COLUMN `is_friday_available` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_monday_available` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_saturday_available` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_sunday_available` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_thursday_available` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_tuesday_available` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_wednesday_available` BOOLEAN NOT NULL DEFAULT false;
