/*
  Warnings:

  - You are about to drop the column `lestNAme` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "lestNAme",
ADD COLUMN     "lestName" TEXT;
