/*
  Warnings:

  - Added the required column `event_id` to the `Mentoring` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meeting_id` to the `Mentoring` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `mentoring` ADD COLUMN `event_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `meeting_id` VARCHAR(191) NOT NULL;
