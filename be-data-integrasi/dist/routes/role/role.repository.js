"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRepository = void 0;
const prisma_1 = require("../../utils/prisma");
// import { GetRoleById } from "./role.type";
class RoleRepository {
    async getRoles() {
        try {
            const roles = await prisma_1.prisma.role.findMany();
            return roles;
        }
        catch (error) {
            console.error("Error fetching roles:", error);
            throw error;
        }
    }
    async createRole(data) {
        try {
            return await prisma_1.prisma.role.create({
                data: {
                    role: data.role,
                },
            });
        }
        catch (error) {
            console.error("Error creating role:", error);
            throw error;
        }
    }
    async checkRoleExists(role) {
        try {
            const existingRole = await prisma_1.prisma.role.findUnique({
                where: { role },
            });
            return !!existingRole;
        }
        catch (error) {
            console.error("Error checking role existence:", error);
            throw error;
        }
    }
    async assignRoleToUser(userId, roleId) {
        try {
            return await prisma_1.prisma.userRole.create({
                data: {
                    userId,
                    roleId,
                },
            });
        }
        catch (error) {
            console.error("Error assigning role to user:", error);
            throw error;
        }
    }
}
exports.RoleRepository = RoleRepository;
