-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_userId_fkey";

-- AlterTable
ALTER TABLE "invoices" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
