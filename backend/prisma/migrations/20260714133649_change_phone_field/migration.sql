/*
  Warnings:

  - You are about to drop the column `phoneNumber` on the `clients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "phoneNumber",
ADD COLUMN     "phone" TEXT;
