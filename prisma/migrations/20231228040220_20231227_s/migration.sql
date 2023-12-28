/*
  Warnings:

  - A unique constraint covering the columns `[checklistKey]` on the table `Checklist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Checklist_checklistKey_key` ON `Checklist`(`checklistKey`);
