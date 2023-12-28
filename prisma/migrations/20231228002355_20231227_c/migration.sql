/*
  Warnings:

  - You are about to drop the column `date` on the `sitedate` table. All the data in the column will be lost.
  - Added the required column `recordDate` to the `SiteDate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sitedate` DROP COLUMN `date`,
    ADD COLUMN `recordDate` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `SiteStatus` ADD CONSTRAINT `SiteStatus_statusCodeId_fkey` FOREIGN KEY (`statusCodeId`) REFERENCES `StatusCode`(`statusCodeId`) ON DELETE RESTRICT ON UPDATE CASCADE;
