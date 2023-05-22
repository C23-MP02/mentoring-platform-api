-- AlterTable
ALTER TABLE `mentoring_attendee` ADD COLUMN `sentiment_id` INTEGER NULL;

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
ALTER TABLE `Mentoring_Attendee` ADD CONSTRAINT `Mentoring_Attendee_sentiment_id_fkey` FOREIGN KEY (`sentiment_id`) REFERENCES `Sentiment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
