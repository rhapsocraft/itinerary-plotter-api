/*
  Warnings:

  - You are about to drop the column `scheduleEnd` on the `activities` table. All the data in the column will be lost.
  - You are about to drop the column `scheduleStart` on the `activities` table. All the data in the column will be lost.
  - You are about to drop the column `tripId` on the `documents` table. All the data in the column will be lost.
  - Added the required column `tripId` to the `activities` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."documents" DROP CONSTRAINT "documents_tripId_fkey";

-- DropIndex
DROP INDEX "public"."documents_tripId_idx";

-- AlterTable
ALTER TABLE "public"."activities" DROP COLUMN "scheduleEnd",
DROP COLUMN "scheduleStart",
ADD COLUMN     "tripId" VARCHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE "public"."documents" DROP COLUMN "tripId";

-- AddForeignKey
ALTER TABLE "public"."activities" ADD CONSTRAINT "activities_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "public"."trips"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
