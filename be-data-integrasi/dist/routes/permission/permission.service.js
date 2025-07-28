"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionService = void 0;
class PermissionService {
    permissionRepository;
    constructor(permissionRepository) {
        this.permissionRepository = permissionRepository;
    }
    async getPermissions() {
        return await this.permissionRepository.getPermissions();
    }
    async createPermission(data) {
        const isDuplicate = await this.permissionRepository.checkDuplicatePermission(data.permission);
        if (isDuplicate) {
            throw new Error("Duplicate permission exists");
        }
        return await this.permissionRepository.createPermission(data);
    }
}
exports.PermissionService = PermissionService;
