-- CreateTable
CREATE TABLE `Site` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `stateCountyId` INTEGER NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `note` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Site` ADD CONSTRAINT `Site_stateCountyId_fkey` FOREIGN KEY (`stateCountyId`) REFERENCES `StateCounty`(`stateCountyKey`) ON DELETE RESTRICT ON UPDATE CASCADE;
