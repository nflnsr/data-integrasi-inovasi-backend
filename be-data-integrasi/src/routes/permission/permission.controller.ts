import { Request, Response, NextFunction } from "express";
import { PermissionService } from "./permission.service";

export class PermissionController {
  private permissionService: PermissionService;

  constructor(permissionService: PermissionService) {
    this.permissionService = permissionService;
  }

  async getPermissions(req: Request, res: Response, next: NextFunction) {
    try {
      const permission = await this.permissionService.getPermissions();

      console.log("Permission data fetched successfully:", permission);
      res.status(200).json(permission);
      return;
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  }

  async createPermission(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      const newPermission = await this.permissionService.createPermission(data);

      console.log("New permission created successfully:", newPermission);
      res.status(201).json(newPermission);
      return;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
      
      res.status(500).json({ error: errorMessage });
      return;
    }
  }
}
