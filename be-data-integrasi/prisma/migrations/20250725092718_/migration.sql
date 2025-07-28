/*
  Warnings:

  - Changed the type of `permission` on the `Permission` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PermissionList" AS ENUM ('read', 'write', 'delete', 'update', 'manage_roles', 'manage_permissions');

-- AlterTable
ALTER TABLE "Permission" DROP COLUMN "permission",
ADD COLUMN     "permission" "PermissionList" NOT NULL;
