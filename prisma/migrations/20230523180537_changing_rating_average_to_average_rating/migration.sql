/*
  Warnings:

  - You are about to drop the column `rating_average` on the `mentor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `mentor` DROP COLUMN `rating_average`,
    ADD COLUMN `average_rating` DOUBLE NULL;
