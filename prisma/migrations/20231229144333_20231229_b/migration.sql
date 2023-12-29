-- AlterTable
ALTER TABLE `site` ALTER COLUMN `stateCountyId` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `Site` ADD CONSTRAINT `Site_stateCountyId_fkey` FOREIGN KEY (`stateCountyId`) REFERENCES `StateCounty`(`stateCountyId`) ON DELETE RESTRICT ON UPDATE CASCADE;
