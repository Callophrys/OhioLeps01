/*
  Warnings:

  - A unique constraint covering the columns `[checklistKey]` on the table `Checklist` will be added. If there are existing duplicate values, this will fail.
  - Made the column `checklistKey` on table `checklist` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `checklist` MODIFY `checklistKey` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Checklist_checklistKey_key` ON `Checklist`(`checklistKey`);
