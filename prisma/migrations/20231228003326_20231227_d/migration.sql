/*
  Warnings:

  - A unique constraint covering the columns `[siteId,year]` on the table `SiteStatus` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `checklist` MODIFY `checkListId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `sitedate` MODIFY `siteDateId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `SiteStatus_siteId_year_key` ON `SiteStatus`(`siteId`, `year`);
