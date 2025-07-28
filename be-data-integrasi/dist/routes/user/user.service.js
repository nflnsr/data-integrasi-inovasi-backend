"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = require("../../utils/bcrypt");
class UserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getUsers() {
        return await this.userRepository.getUsers();
    }
    async getProfile(userId) {
        return await this.userRepository.getProfile(userId);
    }
    async createUser(data) {
        const isUserExist = await this.userRepository.checkEmailExists(data.email);
        if (isUserExist) {
            throw new Error("User already exists");
        }
        const { password, ...userData } = data;
        const hashedPassword = await (0, bcrypt_1.hashPassword)(password);
        return await this.userRepository.createUser({
            ...userData,
            password: hashedPassword,
        });
    }
    async loginUser(email, password) {
        const isUserExist = await this.userRepository.checkEmailExists(email);
        if (!isUserExist) {
            throw new Error("User not found");
        }
        const user = await this.userRepository.loginUser(email);
        if (!(await (0, bcrypt_1.comparePassword)(password, user?.password))) {
            throw new Error("Invalid email or password");
        }
        return user;
    }
}
exports.UserService = UserService;
