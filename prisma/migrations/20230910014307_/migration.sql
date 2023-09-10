/*
  Warnings:

  - You are about to drop the column `doctorEpeciality` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "doctorEpeciality",
ADD COLUMN     "doctorSpeciality" TEXT;
