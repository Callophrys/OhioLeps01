/*
  Warnings:

  - The primary key for the `site` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `site` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `site` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `site` table. All the data in the column will be lost.
  - The primary key for the `statecounty` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `stateCountyKey` on the `statecounty` table. All the data in the column will be lost.
  - Added the required column `address` to the `Site` table without a default value. This is not possible if the table is not empty.
  - Added the required column `county` to the `Site` table without a default value. This is not possible if the table is not empty.
  - Added the required column `person` to the `Site` table without a default value. This is not possible if the table is not empty.
  - Added the required column `s1995` to the `Site` table without a default value. This is not possible if the table is not empty.
  - Added the required column `s1996` to the `Site` table without a default value. This is not possible if the table is not empty.
  - Added the required column `s1997` to the `Site` table without a default value. This is not possible if the table is not empty.
  - Added the required column `s1998` to the `Site` table without a default value. This is not possible if the table is not empty.
  - Added the required column `s1999` to the `Site` table without a default value. This is not possible if the table is not empty.
  - Added the required column `siteId` to the `Site` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stateCountyId` to the `StateCounty` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `site` DROP FOREIGN KEY `Site_stateCountyId_fkey`;

-- AlterTable
ALTER TABLE `site` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `location`,
    DROP COLUMN `note`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `address2` VARCHAR(191) NULL,
    ADD COLUMN `altAddress` VARCHAR(191) NULL,
    ADD COLUMN `altAddress2` VARCHAR(191) NULL,
    ADD COLUMN `altCityStateZip` VARCHAR(191) NULL,
    ADD COLUMN `altEmail` VARCHAR(191) NULL,
    ADD COLUMN `altPerson` VARCHAR(191) NULL,
    ADD COLUMN `altPhone` VARCHAR(191) NULL,
    ADD COLUMN `changeDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `cityStateZip` VARCHAR(191) NULL,
    ADD COLUMN `county` VARCHAR(191) NOT NULL,
    ADD COLUMN `desciption_of_Site` VARCHAR(191) NULL,
    ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `latitudeEnd` VARCHAR(191) NULL,
    ADD COLUMN `latitudeStart` VARCHAR(191) NULL,
    ADD COLUMN `locationZip` VARCHAR(191) NULL,
    ADD COLUMN `otherParticipants` VARCHAR(191) NULL,
    ADD COLUMN `person` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NULL,
    ADD COLUMN `s1995` VARCHAR(191) NOT NULL,
    ADD COLUMN `s1996` VARCHAR(191) NOT NULL,
    ADD COLUMN `s1997` VARCHAR(191) NOT NULL,
    ADD COLUMN `s1998` VARCHAR(191) NOT NULL,
    ADD COLUMN `s1999` VARCHAR(191) NOT NULL,
    ADD COLUMN `s2000` VARCHAR(191) NULL,
    ADD COLUMN `s2001` VARCHAR(191) NULL,
    ADD COLUMN `s2002` VARCHAR(191) NULL,
    ADD COLUMN `s2003` VARCHAR(191) NULL,
    ADD COLUMN `s2004` VARCHAR(191) NULL,
    ADD COLUMN `siteAddress` VARCHAR(191) NULL,
    ADD COLUMN `siteAddress2` VARCHAR(191) NULL,
    ADD COLUMN `siteCityStateZip` VARCHAR(191) NULL,
    ADD COLUMN `siteId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `township` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`siteId`);

-- AlterTable
ALTER TABLE `statecounty` DROP PRIMARY KEY,
    DROP COLUMN `stateCountyKey`,
    ADD COLUMN `stateCountyId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`stateCountyId`);

-- AddForeignKey
ALTER TABLE `Site` ADD CONSTRAINT `Site_stateCountyId_fkey` FOREIGN KEY (`stateCountyId`) REFERENCES `StateCounty`(`stateCountyId`) ON DELETE RESTRICT ON UPDATE CASCADE;
