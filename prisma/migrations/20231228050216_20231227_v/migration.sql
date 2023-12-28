/*
  Warnings:

  - You are about to alter the column `w1` on the `sitedate` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(14))`.
  - You are about to alter the column `w2` on the `sitedate` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(14))`.
  - You are about to alter the column `w3` on the `sitedate` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(14))`.
  - You are about to alter the column `w4` on the `sitedate` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(14))`.
  - You are about to alter the column `w5` on the `sitedate` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(14))`.
  - You are about to alter the column `w6` on the `sitedate` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(14))`.
  - You are about to alter the column `w7` on the `sitedate` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(14))`.
  - You are about to alter the column `w8` on the `sitedate` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(14))`.
  - You are about to alter the column `w9` on the `sitedate` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(14))`.
  - You are about to alter the column `w10` on the `sitedate` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(14))`.
  - You are about to alter the column `w11` on the `sitedate` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(14))`.
  - You are about to alter the column `w12` on the `sitedate` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(14))`.
  - You are about to alter the column `w13` on the `sitedate` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(14))`.
  - You are about to alter the column `w14` on the `sitedate` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(14))`.
  - You are about to alter the column `w15` on the `sitedate` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(14))`.

*/
-- AlterTable
ALTER TABLE `sitedate` MODIFY `w1` ENUM('U', 'O', 'R', 'S') NOT NULL DEFAULT 'U',
    MODIFY `w2` ENUM('U', 'O', 'R', 'S') NOT NULL DEFAULT 'U',
    MODIFY `w3` ENUM('U', 'O', 'R', 'S') NOT NULL DEFAULT 'U',
    MODIFY `w4` ENUM('U', 'O', 'R', 'S') NOT NULL DEFAULT 'U',
    MODIFY `w5` ENUM('U', 'O', 'R', 'S') NOT NULL DEFAULT 'U',
    MODIFY `w6` ENUM('U', 'O', 'R', 'S') NOT NULL DEFAULT 'U',
    MODIFY `w7` ENUM('U', 'O', 'R', 'S') NOT NULL DEFAULT 'U',
    MODIFY `w8` ENUM('U', 'O', 'R', 'S') NOT NULL DEFAULT 'U',
    MODIFY `w9` ENUM('U', 'O', 'R', 'S') NOT NULL DEFAULT 'U',
    MODIFY `w10` ENUM('U', 'O', 'R', 'S') NOT NULL DEFAULT 'U',
    MODIFY `w11` ENUM('U', 'O', 'R', 'S') NOT NULL DEFAULT 'U',
    MODIFY `w12` ENUM('U', 'O', 'R', 'S') NOT NULL DEFAULT 'U',
    MODIFY `w13` ENUM('U', 'O', 'R', 'S') NOT NULL DEFAULT 'U',
    MODIFY `w14` ENUM('U', 'O', 'R', 'S') NOT NULL DEFAULT 'U',
    MODIFY `w15` ENUM('U', 'O', 'R', 'S') NOT NULL DEFAULT 'U';
