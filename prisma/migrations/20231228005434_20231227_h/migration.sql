-- AlterTable
ALTER TABLE `checklist` ADD COLUMN `checklistKey` VARCHAR(191) NULL,
    MODIFY `subspecies` VARCHAR(191) NULL,
    MODIFY `checklistId` INTEGER NOT NULL AUTO_INCREMENT;
