-- AlterTable
ALTER TABLE "public"."activities" ADD COLUMN     "scheduleEndAt" TIMESTAMPTZ(3),
ADD COLUMN     "scheduledAt" TIMESTAMPTZ(3);
