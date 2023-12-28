-- CreateTable
CREATE TABLE `StateCounty` (
    `stateCountyId` INTEGER NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `county` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `StateCounty_state_county_key`(`state`, `county`),
    PRIMARY KEY (`stateCountyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Site` (
    `siteId` INTEGER NOT NULL AUTO_INCREMENT,
    `siteName` VARCHAR(191) NOT NULL,
    `county` VARCHAR(191) NOT NULL,
    `township` VARCHAR(191) NULL,
    `locationZip` VARCHAR(191) NULL,
    `siteAddress` VARCHAR(191) NULL,
    `siteAddress2` VARCHAR(191) NULL,
    `siteCityStateZip` VARCHAR(191) NULL,
    `person` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NULL,
    `address2` VARCHAR(191) NULL,
    `cityStateZip` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `latitudeStart` VARCHAR(191) NULL,
    `latitudeEnd` VARCHAR(191) NULL,
    `altPerson` VARCHAR(191) NULL,
    `altAddress` VARCHAR(191) NULL,
    `altAddress2` VARCHAR(191) NULL,
    `altCityStateZip` VARCHAR(191) NULL,
    `altPhone` VARCHAR(191) NULL,
    `altEmail` VARCHAR(191) NULL,
    `otherParticipants` VARCHAR(191) NULL,
    `description` TEXT NULL,
    `s1995` INTEGER NOT NULL DEFAULT 5,
    `s1996` INTEGER NOT NULL DEFAULT 5,
    `s1997` INTEGER NOT NULL DEFAULT 5,
    `s1998` INTEGER NOT NULL DEFAULT 5,
    `s1999` INTEGER NOT NULL DEFAULT 5,
    `s2000` INTEGER NOT NULL DEFAULT 5,
    `s2001` INTEGER NOT NULL DEFAULT 5,
    `s2002` INTEGER NOT NULL DEFAULT 5,
    `s2003` INTEGER NOT NULL DEFAULT 5,
    `s2004` INTEGER NOT NULL DEFAULT 5,
    `changeDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`siteId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Checklist` (
    `checklistId` INTEGER NOT NULL AUTO_INCREMENT,
    `checklistKey` VARCHAR(191) NOT NULL,
    `genus` VARCHAR(191) NOT NULL,
    `species` VARCHAR(191) NOT NULL,
    `subspecies` VARCHAR(191) NULL,
    `combinedLatin` VARCHAR(191) NOT NULL,
    `commonName` VARCHAR(191) NULL,
    `show` BOOLEAN NOT NULL,
    `kind` VARCHAR(191) NOT NULL,
    `revised` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `year` VARCHAR(191) NULL,
    `changeDate` DATETIME(3) NULL,
    `changeBy` VARCHAR(191) NULL,
    `comment` VARCHAR(191) NULL,
    `referenceCount` INTEGER NOT NULL DEFAULT 0,
    `countyCount` INTEGER NOT NULL DEFAULT 0,
    `endangered` VARCHAR(191) NULL,
    `synonym` VARCHAR(191) NULL,
    `family` INTEGER NOT NULL DEFAULT 0,
    `gCKey` INTEGER NOT NULL DEFAULT 0,
    `grp` INTEGER NOT NULL DEFAULT 0,
    `sortOrder` VARCHAR(191) NULL,
    `tmp_SitesReporting` INTEGER NULL,
    `tmp_TotalCount` INTEGER NULL,
    `tmp_HighCount` INTEGER NULL,

    INDEX `Checklist_genus_idx`(`genus`),
    INDEX `Checklist_species_idx`(`species`),
    INDEX `Checklist_commonName_idx`(`commonName`),
    PRIMARY KEY (`checklistId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SiteObservation` (
    `siteObservationId` INTEGER NOT NULL AUTO_INCREMENT,
    `seqId` INTEGER NULL,
    `checklistKey` VARCHAR(191) NULL,
    `idCode` VARCHAR(191) NULL,
    `total` INTEGER NOT NULL,
    `s1` INTEGER NULL,
    `s2` INTEGER NULL,
    `s3` INTEGER NULL,
    `s4` INTEGER NULL,
    `s5` INTEGER NULL,
    `s6` INTEGER NULL,
    `s7` INTEGER NULL,
    `s8` INTEGER NULL,
    `s9` INTEGER NULL,
    `s10` INTEGER NULL,
    `s11` INTEGER NULL,
    `s12` INTEGER NULL,
    `s13` INTEGER NULL,
    `s14` INTEGER NULL,
    `s15` INTEGER NULL,
    `mark` VARCHAR(191) NULL,
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
    `year` INTEGER NOT NULL,

    UNIQUE INDEX `SiteStatus_siteId_year_key`(`siteId`, `year`),
    PRIMARY KEY (`siteStatusId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SiteDate` (
    `siteDateId` INTEGER NOT NULL,
    `siteId` INTEGER NOT NULL,
    `seqId` INTEGER NULL,
    `recordDate` DATETIME(3) NOT NULL,
    `week` INTEGER NOT NULL,
    `recorder` VARCHAR(191) NOT NULL,
    `startTime` DATETIME(3) NULL,
    `endTime` DATETIME(3) NULL,
    `startTemp` INTEGER NULL,
    `endTemp` INTEGER NULL,
    `startClouds` INTEGER NULL,
    `endClouds` INTEGER NULL,
    `startWindDir` VARCHAR(191) NULL,
    `endWindDir` VARCHAR(191) NULL,
    `startWindMPH` INTEGER NULL,
    `endWindMPH` INTEGER NULL,
    `w1` ENUM('U', 'O', 'R', 'S') NOT NULL DEFAULT 'U',
    `w2` ENUM('U', 'O', 'R', 'S') NOT NULL DEFAULT 'U',
    `w3` ENUM('U', 'O', 'R', 'S') NOT NULL DEFAULT 'U',
    `w4` ENUM('U', 'O', 'R', 'S') NOT NULL DEFAULT 'U',
    `w5` ENUM('U', 'O', 'R', 'S') NOT NULL DEFAULT 'U',
    `w6` ENUM('U', 'O', 'R', 'S') NOT NULL DEFAULT 'U',
    `w7` ENUM('U', 'O', 'R', 'S') NOT NULL DEFAULT 'U',
    `w8` ENUM('U', 'O', 'R', 'S') NOT NULL DEFAULT 'U',
    `w9` ENUM('U', 'O', 'R', 'S') NOT NULL DEFAULT 'U',
    `w10` ENUM('U', 'O', 'R', 'S') NOT NULL DEFAULT 'U',
    `w11` ENUM('U', 'O', 'R', 'S') NOT NULL DEFAULT 'U',
    `w12` ENUM('U', 'O', 'R', 'S') NOT NULL DEFAULT 'U',
    `w13` ENUM('U', 'O', 'R', 'S') NOT NULL DEFAULT 'U',
    `w14` ENUM('U', 'O', 'R', 'S') NOT NULL DEFAULT 'U',
    `w15` ENUM('U', 'O', 'R', 'S') NOT NULL DEFAULT 'U',
    `lEsec1` VARCHAR(191) NULL,
    `lEsec2` VARCHAR(191) NULL,
    `lEsec3` VARCHAR(191) NULL,
    `lEsec4` VARCHAR(191) NULL,
    `lEsec5` VARCHAR(191) NULL,
    `lEsec6` VARCHAR(191) NULL,
    `lEsec7` VARCHAR(191) NULL,
    `lEsec8` VARCHAR(191) NULL,
    `lEsec9` VARCHAR(191) NULL,
    `lEsec10` VARCHAR(191) NULL,
    `lEsec11` VARCHAR(191) NULL,
    `lEsec12` VARCHAR(191) NULL,
    `lEsec13` VARCHAR(191) NULL,
    `lEsec14` VARCHAR(191) NULL,
    `lEsec15` VARCHAR(191) NULL,
    `larvaObA` VARCHAR(191) NULL,
    `larvaObB` VARCHAR(191) NULL,
    `larvaObC` VARCHAR(191) NULL,
    `larvaObD` VARCHAR(191) NULL,
    `energySource1` VARCHAR(191) NULL,
    `energySource2` VARCHAR(191) NULL,
    `energySource3` VARCHAR(191) NULL,
    `energySource4` VARCHAR(191) NULL,
    `flowersInBloom` VARCHAR(191) NULL,
    `fieldNotes` VARCHAR(191) NULL,
    `dateChg` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`siteDateId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
