/*
  Warnings:

  - You are about to drop the column `stripeProductId` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Product` table. All the data in the column will be lost.
  - Added the required column `productId` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_stripeProductId_fkey";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "stripeProductId",
ADD COLUMN     "productId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "id";

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("stripeProductId") ON DELETE RESTRICT ON UPDATE CASCADE;
