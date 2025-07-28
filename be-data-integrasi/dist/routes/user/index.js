"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = require("../../middleware/authenticate");
const user_repository_1 = require("./user.repository");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
const userRepository = new user_repository_1.UserRepository();
const userService = new user_service_1.UserService(userRepository);
const userController = new user_controller_1.UserController(userService);
router.get("/", authenticate_1.authenticate, (req, res, next) => {
    return userController.getUsers(req, res, next);
});
router.get("/profile", authenticate_1.authenticate, (req, res, next) => {
    return userController.getProfile(req, res, next);
});
router.post("/register", (req, res) => {
    return userController.createUser(req, res);
});
router.post("/login", (req, res) => {
    return userController.loginUser(req, res);
});
router.post("/logout", authenticate_1.authenticate, (req, res) => {
    return userController.logoutUser(req, res);
});
exports.default = router;
