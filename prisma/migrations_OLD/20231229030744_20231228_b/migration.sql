/*
  Warnings:

  - Added the required column `statusCodeId` to the `SiteStatus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sitestatus` ADD COLUMN `statusCodeId` INTEGER NOT NULL;
