/*
  Warnings:

  - You are about to drop the column `doctorSpeciality` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "doctorSpeciality",
ADD COLUMN     "doctorSpecialty" TEXT;
