/*
  Warnings:

  - You are about to drop the column `value` on the `ContactMe` table. All the data in the column will be lost.
  - Added the required column `displayedText` to the `ContactMe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `ContactMe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."ContactMe" DROP COLUMN "value",
ADD COLUMN     "displayedText" TEXT NOT NULL,
ADD COLUMN     "link" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."File" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Skill" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);
