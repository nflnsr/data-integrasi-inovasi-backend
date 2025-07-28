"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = require("../../middleware/authenticate");
const role_repository_1 = require("./role.repository");
const role_service_1 = require("./role.service");
const role_controller_1 = require("./role.controller");
const router = (0, express_1.Router)();
const roleRepository = new role_repository_1.RoleRepository();
const roleService = new role_service_1.RoleService(roleRepository);
const roleController = new role_controller_1.RoleController(roleService);
router.get("/", authenticate_1.authenticate, (req, res, next) => {
    return roleController.getRoles(req, res, next);
});
router.post("/", authenticate_1.authenticate, (req, res) => {
    return roleController.createRole(req, res);
});
router.post("/assign", authenticate_1.authenticate, (req, res) => {
    return roleController.assignRoleToUser(req, res);
});
exports.default = router;
