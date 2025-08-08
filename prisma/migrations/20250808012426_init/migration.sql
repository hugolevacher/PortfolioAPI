-- CreateTable
CREATE TABLE "public"."ContactMe" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT,

    CONSTRAINT "ContactMe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContactMe_key_key" ON "public"."ContactMe"("key");
