/*
  Warnings:

  - You are about to drop the column `id` on the `siteobservation` table. All the data in the column will be lost.
  - Added the required column `idCode` to the `SiteObservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `siteobservation` DROP COLUMN `id`,
    ADD COLUMN `idCode` VARCHAR(191) NOT NULL,
    MODIFY `seqId` INTEGER NULL,
    MODIFY `s1` INTEGER NULL,
    MODIFY `s2` INTEGER NULL,
    MODIFY `s3` INTEGER NULL,
    MODIFY `s4` INTEGER NULL,
    MODIFY `s5` INTEGER NULL,
    MODIFY `s6` INTEGER NULL,
    MODIFY `s7` INTEGER NULL,
    MODIFY `s8` INTEGER NULL,
    MODIFY `s9` INTEGER NULL,
    MODIFY `s10` INTEGER NULL,
    MODIFY `s11` INTEGER NULL,
    MODIFY `s12` INTEGER NULL,
    MODIFY `s13` INTEGER NULL,
    MODIFY `s14` INTEGER NULL,
    MODIFY `s15` INTEGER NULL,
    MODIFY `mark` VARCHAR(191) NULL;
