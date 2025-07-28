"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionRepository = void 0;
const prisma_1 = require("../../utils/prisma");
class PermissionRepository {
    async getPermissions() {
        try {
            return await prisma_1.prisma.permission.findMany();
        }
        catch (error) {
            console.error("Error fetching permissions:", error);
            throw error;
        }
    }
    async checkDuplicatePermission(permission) {
        try {
            const existingPermission = await prisma_1.prisma.permission.findFirst({
                where: {
                    permission,
                },
            });
            return existingPermission !== null;
        }
        catch (error) {
            console.error("Error checking duplicate permission:", error);
            throw error;
        }
    }
    async createPermission(data) {
        try {
            return await prisma_1.prisma.permission.create({
                data: {
                    permission: data.permission,
                },
            });
        }
        catch (error) {
            console.error("Error creating permission:", error);
            throw error;
        }
    }
}
exports.PermissionRepository = PermissionRepository;
