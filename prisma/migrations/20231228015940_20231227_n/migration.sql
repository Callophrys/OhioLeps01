/*
  Warnings:

  - You are about to drop the column `checklistId` on the `siteobservation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `siteobservation` DROP FOREIGN KEY `SiteObservation_checklistId_fkey`;

-- AlterTable
ALTER TABLE `siteobservation` DROP COLUMN `checklistId`;
