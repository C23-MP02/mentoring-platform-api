-- DropIndex
DROP INDEX `Time_Availability_time_Slot2Id_fkey` ON `time_availability`;

-- AlterTable
ALTER TABLE `user` MODIFY `role_id` INTEGER NOT NULL DEFAULT 2;
