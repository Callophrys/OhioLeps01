-- AlterTable
ALTER TABLE `siteobservation` ALTER COLUMN `checklistId` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `SiteObservation` ADD CONSTRAINT `SiteObservation_checklistId_fkey` FOREIGN KEY (`checklistId`) REFERENCES `Checklist`(`checklistId`) ON DELETE RESTRICT ON UPDATE CASCADE;
