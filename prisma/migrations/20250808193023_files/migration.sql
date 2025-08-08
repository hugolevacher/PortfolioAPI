/*
  Warnings:

  - You are about to drop the column `fileName` on the `Skill` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fileId]` on the table `Skill` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Skill" DROP COLUMN "fileName",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fileId" INTEGER;

-- CreateTable
CREATE TABLE "public"."File" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Skill_fileId_key" ON "public"."Skill"("fileId");

-- AddForeignKey
ALTER TABLE "public"."Skill" ADD CONSTRAINT "Skill_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "public"."File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
