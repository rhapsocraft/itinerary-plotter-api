/*
  Warnings:

  - The primary key for the `google_accounts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[name]` on the table `files` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `displayName` to the `files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."activities" ALTER COLUMN "displayName" SET DEFAULT '',
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."documents" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."files" ADD COLUMN     "displayName" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "size" INTEGER NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."google_accounts" DROP CONSTRAINT "google_accounts_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "google_accounts_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."trips" ALTER COLUMN "displayName" SET DEFAULT '',
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."users" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "files_name_key" ON "public"."files"("name");
