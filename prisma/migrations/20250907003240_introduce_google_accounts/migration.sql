-- CreateTable
CREATE TABLE "public"."users" (
    "id" VARCHAR(36) NOT NULL,
    "displayName" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."google_accounts" (
    "id" VARCHAR(21) NOT NULL,
    "email" TEXT NOT NULL,
    "userId" VARCHAR(36) NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "google_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "google_accounts_email_key" ON "public"."google_accounts"("email");

-- AddForeignKey
ALTER TABLE "public"."google_accounts" ADD CONSTRAINT "google_accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
