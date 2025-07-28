import { prisma } from "../../utils/prisma";
import { User } from "./user.type";

export class UserRepository {

  async getUsers() {
    try {
      const users = await prisma.user.findMany({
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

      return users.map((user: any) => ({
        ...user,
        roles: user?.roles!.map((r: any) => r.role.role),
      }));
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  async getProfile(userId: number) {
    try {
      const user = await prisma.user.findUnique({
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

      if (!user) return null;

      return {
        ...user,
        roles: user.roles.map((r: any) => r.role.role),
      };
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  }

  async createUser(data: User) {
    try {
      return await prisma.user.create({
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
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async loginUser(email: string) {
    try {
      const user = await prisma.user.findUnique({
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
        roles: user?.roles.map((r: any) => r.role.role) || [],
      };
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  }

  async checkEmailExists(email: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      return !!user;
    } catch (error) {
      console.error("Error checking email existence:", error);
      throw error;
    }
  }
}
