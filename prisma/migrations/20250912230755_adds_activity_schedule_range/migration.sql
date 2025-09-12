/*
  Warnings:

  - Added the required column `scheduleEnd` to the `activities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scheduleStart` to the `activities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."activities" ADD COLUMN     "scheduleEnd" TIMESTAMPTZ(3) NOT NULL,
ADD COLUMN     "scheduleStart" TIMESTAMPTZ(3) NOT NULL;
