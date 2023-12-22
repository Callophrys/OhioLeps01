-- CreateTable
CREATE TABLE `StateCounty` (
    `stateCountyKey` INTEGER NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `county` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `StateCounty_state_county_key`(`state`, `county`),
    PRIMARY KEY (`stateCountyKey`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
