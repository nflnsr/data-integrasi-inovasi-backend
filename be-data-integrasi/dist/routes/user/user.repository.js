"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const prisma_1 = require("../../utils/prisma");
class UserRepository {
    async getUsers() {
        try {
            const users = await prisma_1.prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    roles: {
                        select: {
                            role: true,
                        },
                    },
                },
            });
            return users.map((user) => ({
                ...user,
                roles: user?.roles.map((r) => r.role.role),
            }));
        }
        catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }
    async getProfile(userId) {
        try {
            const user = await prisma_1.prisma.user.findUnique({
                where: { id: userId },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    roles: {
                        select: {
                            role: true,
                        },
                    },
                },
            });
            if (!user)
                return null;
            return {
                ...user,
                roles: user.roles.map((r) => r.role.role),
            };
        }
        catch (error) {
            console.error("Error fetching user by ID:", error);
            throw error;
        }
    }
    async createUser(data) {
        try {
            return await prisma_1.prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    ...(data.roleId && {
                        roles: {
                            create: Array.isArray(data.roleId)
                                ? data.roleId.map((roleId) => ({
                                    role: { connect: { id: roleId } },
                                }))
                                : [
                                    {
                                        role: {
                                            connect: { id: data.roleId },
                                        },
                                    },
                                ],
                        },
                    }),
                },
            });
        }
        catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    }
    async loginUser(email) {
        try {
            const user = await prisma_1.prisma.user.findUnique({
                where: { email },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: true,
                    roles: {
                        select: {
                            role: true,
                        },
                    },
                },
            });
            return {
                ...user,
                roles: user?.roles.map((r) => r.role.role) || [],
            };
        }
        catch (error) {
            console.error("Error logging in user:", error);
            throw error;
        }
    }
    async checkEmailExists(email) {
        try {
            const user = await prisma_1.prisma.user.findUnique({
                where: { email },
            });
            return !!user;
        }
        catch (error) {
            console.error("Error checking email existence:", error);
            throw error;
        }
    }
}
exports.UserRepository = UserRepository;
