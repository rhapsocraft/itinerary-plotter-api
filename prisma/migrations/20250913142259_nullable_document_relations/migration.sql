-- DropForeignKey
ALTER TABLE "public"."documents" DROP CONSTRAINT "documents_activityId_fkey";

-- DropForeignKey
ALTER TABLE "public"."documents" DROP CONSTRAINT "documents_tripId_fkey";

-- AlterTable
ALTER TABLE "public"."documents" ALTER COLUMN "activityId" DROP NOT NULL,
ALTER COLUMN "tripId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."documents" ADD CONSTRAINT "documents_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "public"."activities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."documents" ADD CONSTRAINT "documents_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "public"."trips"("id") ON DELETE SET NULL ON UPDATE CASCADE;
