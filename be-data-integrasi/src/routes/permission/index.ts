import { Router, Request, Response, NextFunction } from "express";
// import { authenticate } from "~/middleware/authenticate";
import { PermissionRepository } from "./permission.repository";
import { PermissionService } from "./permission.service";
import { PermissionController } from "./permission.controller";

const router = Router();

const permissionRepository = new PermissionRepository();
const permissionService = new PermissionService(permissionRepository);
const permissionController = new PermissionController(permissionService);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  return permissionController.getPermissions(req, res, next);
});

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  return permissionController.createPermission(req, res, next);
});

export default router;
