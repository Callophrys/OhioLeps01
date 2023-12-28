/*
  Warnings:

  - You are about to drop the column `countys` on the `checklist` table. All the data in the column will be lost.
  - You are about to drop the column `references` on the `checklist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `checklist` DROP COLUMN `countys`,
    DROP COLUMN `references`,
    ADD COLUMN `countyCount` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `referenceCount` INTEGER NOT NULL DEFAULT 0;
