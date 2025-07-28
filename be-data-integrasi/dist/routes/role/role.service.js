"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleService = void 0;
class RoleService {
    roleRepository;
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    async getRoles() {
        return await this.roleRepository.getRoles();
    }
    async createRole(data) {
        const isRoleExist = await this.roleRepository.checkRoleExists(data.role);
        if (isRoleExist) {
            throw new Error("Role already exists");
        }
        return await this.roleRepository.createRole(data);
    }
    async assignRoleToUser(userId, roleId) {
        return await this.roleRepository.assignRoleToUser(userId, roleId);
    }
}
exports.RoleService = RoleService;
