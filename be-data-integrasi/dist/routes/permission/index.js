"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { authenticate } from "~/middleware/authenticate";
const permission_repository_1 = require("./permission.repository");
const permission_service_1 = require("./permission.service");
const permission_controller_1 = require("./permission.controller");
const router = (0, express_1.Router)();
const permissionRepository = new permission_repository_1.PermissionRepository();
const permissionService = new permission_service_1.PermissionService(permissionRepository);
const permissionController = new permission_controller_1.PermissionController(permissionService);
router.get("/", (req, res, next) => {
    return permissionController.getPermissions(req, res, next);
});
router.post("/", (req, res, next) => {
    return permissionController.createPermission(req, res, next);
});
exports.default = router;
