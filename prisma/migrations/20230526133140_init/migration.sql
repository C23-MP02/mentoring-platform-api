-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Role_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Gender` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Gender_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `role_id` INTEGER NOT NULL DEFAULT 2,
    `gender_id` INTEGER NULL,
    `email` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `bio` VARCHAR(191) NULL,
    `profile_picture_url` VARCHAR(191) NULL,
    `is_path_android` BOOLEAN NOT NULL DEFAULT false,
    `is_path_web` BOOLEAN NOT NULL DEFAULT false,
    `is_path_ios` BOOLEAN NOT NULL DEFAULT false,
    `is_path_ml` BOOLEAN NOT NULL DEFAULT false,
    `is_path_flutter` BOOLEAN NOT NULL DEFAULT false,
    `is_path_fe` BOOLEAN NOT NULL DEFAULT false,
    `is_path_be` BOOLEAN NOT NULL DEFAULT false,
    `is_path_react` BOOLEAN NOT NULL DEFAULT false,
    `is_path_devops` BOOLEAN NOT NULL DEFAULT false,
    `is_path_gcp` BOOLEAN NOT NULL DEFAULT false,
    `is_monday_available` BOOLEAN NOT NULL DEFAULT false,
    `is_tuesday_available` BOOLEAN NOT NULL DEFAULT false,
    `is_wednesday_available` BOOLEAN NOT NULL DEFAULT false,
    `is_thursday_available` BOOLEAN NOT NULL DEFAULT false,
    `is_friday_available` BOOLEAN NOT NULL DEFAULT false,
    `is_saturday_available` BOOLEAN NOT NULL DEFAULT false,
    `is_sunday_available` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mentee` (
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Mentee_user_id_key`(`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mentor` (
    `user_id` INTEGER NOT NULL,
    `average_rating` DOUBLE NULL,
    `rating_count` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Mentor_user_id_key`(`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mentoring` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mentor_id` INTEGER NOT NULL,
    `start_time` DATETIME(3) NOT NULL,
    `end_time` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mentoring_Attendee` (
    `mentoring_id` INTEGER NOT NULL,
    `mentee_id` INTEGER NOT NULL,
    `rating` INTEGER NULL,
    `feedback` VARCHAR(191) NULL,
    `en_feedback` VARCHAR(191) NULL,
    `sentiment_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`mentoring_id`, `mentee_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sentiment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Sentiment_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_gender_id_fkey` FOREIGN KEY (`gender_id`) REFERENCES `Gender`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mentee` ADD CONSTRAINT `Mentee_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mentor` ADD CONSTRAINT `Mentor_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mentoring` ADD CONSTRAINT `Mentoring_mentor_id_fkey` FOREIGN KEY (`mentor_id`) REFERENCES `Mentor`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mentoring_Attendee` ADD CONSTRAINT `Mentoring_Attendee_mentoring_id_fkey` FOREIGN KEY (`mentoring_id`) REFERENCES `Mentoring`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mentoring_Attendee` ADD CONSTRAINT `Mentoring_Attendee_mentee_id_fkey` FOREIGN KEY (`mentee_id`) REFERENCES `Mentee`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mentoring_Attendee` ADD CONSTRAINT `Mentoring_Attendee_sentiment_id_fkey` FOREIGN KEY (`sentiment_id`) REFERENCES `Sentiment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
