/*
  Warnings:

  - Added the required column `tripId` to the `documents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."documents" ADD COLUMN     "tripId" VARCHAR(36) NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."documents" ADD CONSTRAINT "documents_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "public"."trips"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
