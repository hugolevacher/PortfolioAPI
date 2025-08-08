/*
  Warnings:

  - You are about to drop the column `imagePath` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fileName` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Skill" DROP COLUMN "imagePath",
ADD COLUMN     "fileName" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."File";

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");
