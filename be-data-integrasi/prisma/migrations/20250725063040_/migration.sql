/*
  Warnings:

  - The values [Level_1,Level_2,Level_3,Level_4,Level_5] on the enum `RoleList` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `roleId` on the `User` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RoleList_new" AS ENUM ('level_1', 'level_2', 'level_3', 'level_4', 'level_5');
ALTER TABLE "Role" ALTER COLUMN "role" TYPE "RoleList_new" USING ("role"::text::"RoleList_new");
ALTER TYPE "RoleList" RENAME TO "RoleList_old";
ALTER TYPE "RoleList_new" RENAME TO "RoleList";
DROP TYPE "RoleList_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roleId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "roleId";

-- CreateTable
CREATE TABLE "UserRole" (
    "userId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("userId","roleId")
);

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
