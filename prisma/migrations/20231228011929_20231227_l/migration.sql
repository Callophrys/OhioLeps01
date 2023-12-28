/*
  Warnings:

  - You are about to alter the column `checklistId` on the `siteobservation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `siteobservation` ADD COLUMN `checklistKey` VARCHAR(191) NULL,
    MODIFY `checklistId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `SiteObservation` ADD CONSTRAINT `SiteObservation_checklistId_fkey` FOREIGN KEY (`checklistId`) REFERENCES `Checklist`(`checklistId`) ON DELETE RESTRICT ON UPDATE CASCADE;
