/*
  Warnings:

  - Made the column `props` on table `Novels` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Novels" ALTER COLUMN "props" SET NOT NULL,
ALTER COLUMN "props" SET DEFAULT 'MIENPHI';
