"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleController = void 0;
class RoleController {
    roleService;
    constructor(roleService) {
        this.roleService = roleService;
    }
    async getRoles(req, res, next) {
        try {
            const roles = await this.roleService.getRoles();
            if (!roles) {
                console.log("No roles found");
                res.status(404).json({ error: "No roles found" });
                return;
            }
            res.status(200).json(roles);
            return;
        }
        catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
    }
    async createRole(req, res) {
        try {
            const { role } = req.body;
            const newRole = await this.roleService.createRole({ role });
            res.status(201).json(newRole);
            return;
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
            res.status(500).json({ error: errorMessage });
            return;
        }
    }
    async assignRoleToUser(req, res) {
        try {
            const userRole = req.user?.roles;
            let userId = 0;
            let roleId = 0;
            if (userRole?.includes("Admin")) {
                userId = req.body.userId;
                roleId = req.body.roleId;
            }
            else {
                userId = Number(req.user?.id);
                roleId = req.body.roleId;
            }
            if (!userId || !roleId) {
                res.status(400).json({ error: "User ID and Role ID are required" });
                return;
            }
            const result = await this.roleService.assignRoleToUser(userId, roleId);
            res.status(200).json(result);
            return;
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
            res.status(500).json({ error: errorMessage });
            return;
        }
    }
}
exports.RoleController = RoleController;
