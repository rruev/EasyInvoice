/*
  Warnings:

  - You are about to drop the column `companyEmail` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "companyEmail",
ADD COLUMN     "businessEmail" TEXT;
