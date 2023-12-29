-- AddForeignKey
ALTER TABLE `SiteStatus` ADD CONSTRAINT `SiteStatus_statusCodeId_fkey` FOREIGN KEY (`statusCodeId`) REFERENCES `StatusCode`(`statusCodeId`) ON DELETE RESTRICT ON UPDATE CASCADE;
