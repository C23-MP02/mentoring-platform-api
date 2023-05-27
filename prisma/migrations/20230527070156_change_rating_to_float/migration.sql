/*
  Warnings:

  - You are about to alter the column `rating` on the `mentoring_attendee` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `mentoring_attendee` MODIFY `rating` DOUBLE NULL;
