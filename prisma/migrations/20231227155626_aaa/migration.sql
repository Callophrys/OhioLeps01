/*
  Warnings:

  - You are about to drop the column `stateCountyId` on the `site` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `site` DROP FOREIGN KEY `Site_stateCountyId_fkey`;

-- AlterTable
ALTER TABLE `site` DROP COLUMN `stateCountyId`;
