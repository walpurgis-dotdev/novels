/*
  Warnings:

  - You are about to drop the column `isSold` on the `Novels` table. All the data in the column will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "NovelProps" ADD VALUE 'MIENPHI';
ALTER TYPE "NovelProps" ADD VALUE 'THUPHI';

-- AlterTable
ALTER TABLE "Novels" DROP COLUMN "isSold";
