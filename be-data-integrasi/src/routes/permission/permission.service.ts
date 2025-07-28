import { PermissionList } from "@prisma/client";
import { PermissionRepository } from "./permission.repository";

export class PermissionService {
  private permissionRepository: PermissionRepository;

  constructor(permissionRepository: PermissionRepository) {
    this.permissionRepository = permissionRepository;
  }

  async getPermissions() {
    return await this.permissionRepository.getPermissions();
  }

  async createPermission(data: { permission: PermissionList }) {
    const isDuplicate = await this.permissionRepository.checkDuplicatePermission(data.permission);

    if (isDuplicate) {
      throw new Error("Duplicate permission exists");
    }

    return await this.permissionRepository.createPermission(data);
  }
}
