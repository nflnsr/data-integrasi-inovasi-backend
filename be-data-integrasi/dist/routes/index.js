"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
const permission_1 = __importDefault(require("./permission"));
const role_1 = __importDefault(require("./role"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.use("/api/user", user_1.default);
router.use("/api/permission", permission_1.default);
router.use("/api/role", role_1.default);
exports.default = router;
