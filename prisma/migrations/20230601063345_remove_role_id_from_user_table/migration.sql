/*
  Warnings:

  - You are about to drop the column `role_id` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_role_id_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `role_id`;
