/*
  Warnings:

  - The primary key for the `mentoring_attendee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `mentoring_attendee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `mentoring_attendee` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`mentoring_id`, `mentee_id`);
