/*
  Warnings:

  - You are about to drop the column `data` on the `files` table. All the data in the column will be lost.
  - Added the required column `src` to the `files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."files" DROP COLUMN "data",
ADD COLUMN     "src" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."user_sessions" (
    "sid" VARCHAR NOT NULL,
    "sess" JSON NOT NULL,
    "expire" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
);

-- CreateIndex
CREATE INDEX "IDX_session_expire" ON "public"."user_sessions"("expire");
