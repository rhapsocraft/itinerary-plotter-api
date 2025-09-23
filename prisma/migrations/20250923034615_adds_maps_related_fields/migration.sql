-- AlterTable
ALTER TABLE "public"."activities" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "locations" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "public"."trips" ADD COLUMN     "centralLocation" JSONB NOT NULL DEFAULT '{}';
