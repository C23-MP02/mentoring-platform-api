/*
  Warnings:

  - You are about to drop the column `feedback` on the `mentoring` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `mentoring` table. All the data in the column will be lost.
  - Added the required column `end_time` to the `Mentoring` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `Mentoring` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `mentoring` DROP COLUMN `feedback`,
    DROP COLUMN `rating`,
    ADD COLUMN `end_time` DATETIME(3) NOT NULL,
    ADD COLUMN `start_time` DATETIME(3) NOT NULL;
