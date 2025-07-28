"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionController = void 0;
class PermissionController {
    permissionService;
    constructor(permissionService) {
        this.permissionService = permissionService;
    }
    async getPermissions(req, res, next) {
        try {
            const permission = await this.permissionService.getPermissions();
            console.log("Permission data fetched successfully:", permission);
            res.status(200).json(permission);
            return;
        }
        catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
    }
    async createPermission(req, res, next) {
        try {
            const data = req.body;
            const newPermission = await this.permissionService.createPermission(data);
            console.log("New permission created successfully:", newPermission);
            res.status(201).json(newPermission);
            return;
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
            res.status(500).json({ error: errorMessage });
            return;
        }
    }
}
exports.PermissionController = PermissionController;
