/*
  Warnings:

  - You are about to drop the column `scheduleEndAt` on the `activities` table. All the data in the column will be lost.
  - You are about to drop the column `scheduledAt` on the `activities` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."activities" DROP COLUMN "scheduleEndAt",
DROP COLUMN "scheduledAt",
ADD COLUMN     "scheduleEnd" TIMESTAMPTZ(3),
ADD COLUMN     "scheduleStart" TIMESTAMPTZ(3);
