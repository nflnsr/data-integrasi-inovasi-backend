"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const jwt_1 = require("../../utils/jwt");
class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async getUsers(req, res, next) {
        try {
            const users = await this.userService.getUsers();
            if (!users) {
                console.log("No users found");
                res.status(404).json({ error: "No users found" });
                return;
            }
            res.status(200).json(users);
            return;
        }
        catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
    }
    async getProfile(req, res, next) {
        try {
            const userId = Number(req.user?.id);
            const user = await this.userService.getProfile(userId);
            if (!user) {
                console.log("User not found for ID:", userId);
                res.status(404).json({ error: "User not found" });
                return;
            }
            const accessToken = (0, jwt_1.generateAccessToken)(user);
            const refreshToken = (0, jwt_1.generateRefreshToken)(user);
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                maxAge: 1000 * 60 * 60,
            });
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                maxAge: 1000 * 60 * 60 * 24 * 7,
            });
            res.status(200).json(user);
            return;
        }
        catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
    }
    async createUser(req, res) {
        try {
            const data = req.body;
            const newUser = await this.userService.createUser(data);
            res.status(201).json(newUser);
            return;
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
            res.status(500).json({ error: errorMessage });
            return;
        }
    }
    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const user = await this.userService.loginUser(email, password);
            if (!user) {
                res.status(401).json({ error: "Invalid email or password" });
                return;
            }
            const accessToken = (0, jwt_1.generateAccessToken)(user);
            const refreshToken = (0, jwt_1.generateRefreshToken)(user);
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                maxAge: 1000 * 60 * 60,
            });
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                maxAge: 1000 * 60 * 60 * 24 * 7,
            });
            res.status(200).json({ user });
            return;
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
            res.status(500).json({ error: errorMessage });
            return;
        }
    }
    async logoutUser(req, res) {
        try {
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
            res.status(200).json({ message: "Logout successful" });
            return;
        }
        catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
    }
}
exports.UserController = UserController;
