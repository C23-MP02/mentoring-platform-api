/*
  Warnings:

  - The primary key for the `mentee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `mentee` table. All the data in the column will be lost.
  - The primary key for the `mentor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `mentor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `mentee` DROP PRIMARY KEY,
    DROP COLUMN `id`;

-- AlterTable
ALTER TABLE `mentor` DROP PRIMARY KEY,
    DROP COLUMN `id`;
