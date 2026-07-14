/*
  Warnings:

  - You are about to drop the column `amount` on the `invoices` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[invoiceNum]` on the table `invoices` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `invoiceNum` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issuedAt` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workedAt` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `invoices` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_userId_fkey";

-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "amount",
ADD COLUMN     "invoiceNum" TEXT NOT NULL,
ADD COLUMN     "issuedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "workedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "businessAddress" TEXT,
ADD COLUMN     "businessName" TEXT,
ADD COLUMN     "companyEmail" TEXT,
ADD COLUMN     "phoneNumber" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "invoices_invoiceNum_key" ON "invoices"("invoiceNum");

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
