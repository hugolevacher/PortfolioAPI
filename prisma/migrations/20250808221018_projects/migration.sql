/*
  Warnings:

  - You are about to drop the `ContactMe` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."ContactMe";

-- CreateTable
CREATE TABLE "public"."Project" (
    "id" SERIAL NOT NULL,
    "titleFr" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "descriptionFr" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "textFr" TEXT NOT NULL,
    "textEn" TEXT NOT NULL,
    "projectUrl" TEXT,
    "githubUrl" TEXT,
    "imageId" INTEGER,
    "videoId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_imageId_key" ON "public"."Project"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_videoId_key" ON "public"."Project"("videoId");

-- AddForeignKey
ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "public"."File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "public"."File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
