/*
  Warnings:

  - The primary key for the `checklist` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `checkListId` on the `checklist` table. All the data in the column will be lost.
  - You are about to drop the column `checkListId` on the `siteobservation` table. All the data in the column will be lost.
  - Added the required column `checklistId` to the `Checklist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checklistId` to the `SiteObservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `checklist` DROP PRIMARY KEY,
    DROP COLUMN `checkListId`,
    ADD COLUMN `checklistId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`checklistId`);

-- AlterTable
ALTER TABLE `siteobservation` DROP COLUMN `checkListId`,
    ADD COLUMN `checklistId` VARCHAR(191) NOT NULL;

-- RenameIndex
ALTER TABLE `checklist` RENAME INDEX `CheckList_commonName_idx` TO `Checklist_commonName_idx`;

-- RenameIndex
ALTER TABLE `checklist` RENAME INDEX `CheckList_genus_idx` TO `Checklist_genus_idx`;

-- RenameIndex
ALTER TABLE `checklist` RENAME INDEX `CheckList_species_idx` TO `Checklist_species_idx`;
