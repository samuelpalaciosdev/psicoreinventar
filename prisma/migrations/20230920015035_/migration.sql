/*
  Warnings:

  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `stripeProductId` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_stripeProductId_fkey";

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
ALTER COLUMN "stripeProductId" SET NOT NULL,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("stripeProductId");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_stripeProductId_fkey" FOREIGN KEY ("stripeProductId") REFERENCES "Product"("stripeProductId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
