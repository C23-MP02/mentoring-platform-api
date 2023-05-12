/*
  Warnings:

  - You are about to drop the column `int_android` on the `mentee` table. All the data in the column will be lost.
  - You are about to drop the column `int_be` on the `mentee` table. All the data in the column will be lost.
  - You are about to drop the column `int_devops` on the `mentee` table. All the data in the column will be lost.
  - You are about to drop the column `int_flutter` on the `mentee` table. All the data in the column will be lost.
  - You are about to drop the column `int_gcp` on the `mentee` table. All the data in the column will be lost.
  - You are about to drop the column `int_ios` on the `mentee` table. All the data in the column will be lost.
  - You are about to drop the column `int_ml` on the `mentee` table. All the data in the column will be lost.
  - You are about to drop the column `int_react` on the `mentee` table. All the data in the column will be lost.
  - You are about to drop the column `int_web` on the `mentee` table. All the data in the column will be lost.
  - You are about to drop the column `exp_android` on the `mentor` table. All the data in the column will be lost.
  - You are about to drop the column `exp_be` on the `mentor` table. All the data in the column will be lost.
  - You are about to drop the column `exp_devops` on the `mentor` table. All the data in the column will be lost.
  - You are about to drop the column `exp_flutter` on the `mentor` table. All the data in the column will be lost.
  - You are about to drop the column `exp_gcp` on the `mentor` table. All the data in the column will be lost.
  - You are about to drop the column `exp_ios` on the `mentor` table. All the data in the column will be lost.
  - You are about to drop the column `exp_ml` on the `mentor` table. All the data in the column will be lost.
  - You are about to drop the column `exp_react` on the `mentor` table. All the data in the column will be lost.
  - You are about to drop the column `exp_web` on the `mentor` table. All the data in the column will be lost.
  - You are about to drop the column `auth` on the `user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `User_auth_key` ON `user`;

-- AlterTable
ALTER TABLE `mentee` DROP COLUMN `int_android`,
    DROP COLUMN `int_be`,
    DROP COLUMN `int_devops`,
    DROP COLUMN `int_flutter`,
    DROP COLUMN `int_gcp`,
    DROP COLUMN `int_ios`,
    DROP COLUMN `int_ml`,
    DROP COLUMN `int_react`,
    DROP COLUMN `int_web`;

-- AlterTable
ALTER TABLE `mentor` DROP COLUMN `exp_android`,
    DROP COLUMN `exp_be`,
    DROP COLUMN `exp_devops`,
    DROP COLUMN `exp_flutter`,
    DROP COLUMN `exp_gcp`,
    DROP COLUMN `exp_ios`,
    DROP COLUMN `exp_ml`,
    DROP COLUMN `exp_react`,
    DROP COLUMN `exp_web`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `auth`,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `gender_id` INTEGER NULL,
    ADD COLUMN `is_path_android` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_path_be` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_path_devops` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_path_flutter` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_path_gcp` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_path_ios` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_path_ml` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_path_react` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_path_web` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `Gender` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Gender_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_gender_id_fkey` FOREIGN KEY (`gender_id`) REFERENCES `Gender`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
