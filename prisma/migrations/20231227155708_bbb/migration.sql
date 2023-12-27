/*
  Warnings:

  - Added the required column `stateCountyId` to the `Site` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `site` ADD COLUMN `stateCountyId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Site` ADD CONSTRAINT `Site_stateCountyId_fkey` FOREIGN KEY (`stateCountyId`) REFERENCES `StateCounty`(`stateCountyId`) ON DELETE RESTRICT ON UPDATE CASCADE;
