import { prisma } from "../../utils/prisma";
import { PermissionList } from "@prisma/client";

export class PermissionRepository {
  async getPermissions() {
    try {
      return await prisma.permission.findMany();
    } catch (error) {
      console.error("Error fetching permissions:", error);
      throw error;
    }
  }

  async checkDuplicatePermission(permission: any) {
    try {
      const existingPermission = await prisma.permission.findFirst({
        where: {
          permission,
        },
      });
      return existingPermission !== null;
    } catch (error) {
      console.error("Error checking duplicate permission:", error);
      throw error;
    }
  }

  async createPermission(data: { permission: PermissionList }) {
    try {
      return await prisma.permission.create({
        data: {
          permission: data.permission,
        },
      });
    } catch (error) {
      console.error("Error creating permission:", error);
      throw error;
    }
  }
}
