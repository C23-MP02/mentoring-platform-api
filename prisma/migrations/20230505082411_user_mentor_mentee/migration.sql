/*
  Warnings:

  - You are about to drop the column `username` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[auth]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `auth` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- DropIndex
DROP INDEX `User_username_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `username`,
    ADD COLUMN `address` VARCHAR(191) NULL,
    ADD COLUMN `auth` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL,
    ADD COLUMN `role` ENUM('ADMIN', 'MENTOR', 'MENTEE') NOT NULL DEFAULT 'MENTEE',
    MODIFY `name` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `post`;

-- CreateTable
CREATE TABLE `Mentee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `int_android` BOOLEAN NOT NULL DEFAULT false,
    `int_web` BOOLEAN NOT NULL DEFAULT false,
    `int_ios` BOOLEAN NOT NULL DEFAULT false,
    `int_ml` BOOLEAN NOT NULL DEFAULT false,
    `int_flutter` BOOLEAN NOT NULL DEFAULT false,
    `int_be` BOOLEAN NOT NULL DEFAULT false,
    `int_react` BOOLEAN NOT NULL DEFAULT false,
    `int_devops` BOOLEAN NOT NULL DEFAULT false,
    `int_gcp` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Mentee_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mentor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `exp_android` BOOLEAN NOT NULL DEFAULT false,
    `exp_web` BOOLEAN NOT NULL DEFAULT false,
    `exp_ios` BOOLEAN NOT NULL DEFAULT false,
    `exp_ml` BOOLEAN NOT NULL DEFAULT false,
    `exp_flutter` BOOLEAN NOT NULL DEFAULT false,
    `exp_be` BOOLEAN NOT NULL DEFAULT false,
    `exp_react` BOOLEAN NOT NULL DEFAULT false,
    `exp_devops` BOOLEAN NOT NULL DEFAULT false,
    `exp_gcp` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Mentor_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_auth_key` ON `User`(`auth`);

-- AddForeignKey
ALTER TABLE `Mentee` ADD CONSTRAINT `Mentee_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mentor` ADD CONSTRAINT `Mentor_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
