-- CreateTable
CREATE TABLE `CheckList` (
    `checkListId` INTEGER NOT NULL AUTO_INCREMENT,
    `genus` VARCHAR(191) NOT NULL,
    `species` VARCHAR(191) NOT NULL,
    `subspecies` VARCHAR(191) NOT NULL,
    `combinedLatin` VARCHAR(191) NOT NULL,
    `commonName` VARCHAR(191) NOT NULL,
    `show` BOOLEAN NOT NULL,
    `kind` VARCHAR(191) NOT NULL,
    `revised` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `year` VARCHAR(191) NOT NULL,
    `changeDate` DATETIME(3) NULL,
    `changeBy` VARCHAR(191) NULL,
    `comment` VARCHAR(191) NULL,
    `references` INTEGER NOT NULL,
    `countys` INTEGER NOT NULL,
    `endangered` VARCHAR(191) NULL,
    `synonym` VARCHAR(191) NULL,
    `family` INTEGER NOT NULL,
    `gCKey` INTEGER NOT NULL,
    `grp` INTEGER NOT NULL,
    `sortOrder` VARCHAR(191) NULL,
    `tmp_SitesReporting` INTEGER NULL,
    `tmp_TotalCount` INTEGER NULL,
    `tmp_HighCount` INTEGER NULL,

    INDEX `CheckList_genus_idx`(`genus`),
    INDEX `CheckList_species_idx`(`species`),
    INDEX `CheckList_commonName_idx`(`commonName`),
    PRIMARY KEY (`checkListId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SiteObservation` (
    `siteObservationId` INTEGER NOT NULL AUTO_INCREMENT,
    `seqId` INTEGER NOT NULL,
    `checkListId` VARCHAR(191) NOT NULL,
    `id` VARCHAR(191) NOT NULL,
    `total` INTEGER NOT NULL,
    `s1` INTEGER NOT NULL,
    `s2` INTEGER NOT NULL,
    `s3` INTEGER NOT NULL,
    `s4` INTEGER NOT NULL,
    `s5` INTEGER NOT NULL,
    `s6` INTEGER NOT NULL,
    `s7` INTEGER NOT NULL,
    `s8` INTEGER NOT NULL,
    `s9` INTEGER NOT NULL,
    `s10` INTEGER NOT NULL,
    `s11` INTEGER NOT NULL,
    `s12` INTEGER NOT NULL,
    `s13` INTEGER NOT NULL,
    `s14` INTEGER NOT NULL,
    `s15` INTEGER NOT NULL,
    `mark` VARCHAR(191) NOT NULL,
    `dateChg` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`siteObservationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StatusCode` (
    `statusCodeId` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`statusCodeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SiteStatus` (
    `siteStatusId` INTEGER NOT NULL AUTO_INCREMENT,
    `siteId` INTEGER NOT NULL,
    `statusCodeId` INTEGER NOT NULL,
    `year` INTEGER NOT NULL,

    PRIMARY KEY (`siteStatusId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SiteDate` (
    `siteDateId` INTEGER NOT NULL AUTO_INCREMENT,
    `seqId` INTEGER NOT NULL,
    `siteId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `week` INTEGER NOT NULL,
    `recorder` VARCHAR(191) NOT NULL,
    `startTime` DATETIME(3) NOT NULL,
    `endTime` DATETIME(3) NOT NULL,
    `startTemp` INTEGER NOT NULL,
    `endTemp` INTEGER NOT NULL,
    `startClouds` INTEGER NOT NULL,
    `endClouds` INTEGER NOT NULL,
    `startWindDir` VARCHAR(191) NOT NULL,
    `endWindDir` VARCHAR(191) NOT NULL,
    `startWindMPH` INTEGER NOT NULL,
    `endWindMPH` INTEGER NOT NULL,
    `w1` VARCHAR(191) NOT NULL,
    `w2` VARCHAR(191) NOT NULL,
    `w3` VARCHAR(191) NOT NULL,
    `w4` VARCHAR(191) NOT NULL,
    `w5` VARCHAR(191) NOT NULL,
    `w6` VARCHAR(191) NOT NULL,
    `w7` VARCHAR(191) NOT NULL,
    `w8` VARCHAR(191) NOT NULL,
    `w9` VARCHAR(191) NOT NULL,
    `w10` VARCHAR(191) NOT NULL,
    `w11` VARCHAR(191) NOT NULL,
    `w12` VARCHAR(191) NOT NULL,
    `w13` VARCHAR(191) NOT NULL,
    `w14` VARCHAR(191) NOT NULL,
    `w15` VARCHAR(191) NOT NULL,
    `lEsec1` VARCHAR(191) NOT NULL,
    `lEsec2` VARCHAR(191) NOT NULL,
    `lEsec3` VARCHAR(191) NOT NULL,
    `lEsec4` VARCHAR(191) NOT NULL,
    `lEsec5` VARCHAR(191) NOT NULL,
    `lEsec6` VARCHAR(191) NOT NULL,
    `lEsec7` VARCHAR(191) NOT NULL,
    `lEsec8` VARCHAR(191) NOT NULL,
    `lEsec9` VARCHAR(191) NOT NULL,
    `lEsec10` VARCHAR(191) NOT NULL,
    `lEsec11` VARCHAR(191) NOT NULL,
    `lEsec12` VARCHAR(191) NOT NULL,
    `lEsec13` VARCHAR(191) NOT NULL,
    `lEsec14` VARCHAR(191) NOT NULL,
    `lEsec15` VARCHAR(191) NOT NULL,
    `larvaObA` VARCHAR(191) NOT NULL,
    `larvaObB` VARCHAR(191) NOT NULL,
    `larvaObC` VARCHAR(191) NOT NULL,
    `larvaObD` VARCHAR(191) NOT NULL,
    `energySource1` VARCHAR(191) NOT NULL,
    `energySource2` VARCHAR(191) NOT NULL,
    `energySource3` VARCHAR(191) NOT NULL,
    `energySource4` VARCHAR(191) NOT NULL,
    `flowersInBloom` VARCHAR(191) NOT NULL,
    `fieldNotes` VARCHAR(191) NOT NULL,
    `dateChg` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `SiteDate_seqId_siteId_key`(`seqId`, `siteId`),
    PRIMARY KEY (`siteDateId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
