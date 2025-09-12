-- AlterTable
ALTER TABLE "public"."documents" ALTER COLUMN "content" SET DEFAULT '';

-- CreateIndex
CREATE INDEX "documents_tripId_idx" ON "public"."documents"("tripId");

-- CreateIndex
CREATE INDEX "files_uploaderId_idx" ON "public"."files"("uploaderId");

-- CreateIndex
CREATE INDEX "trips_ownerId_idx" ON "public"."trips"("ownerId");
