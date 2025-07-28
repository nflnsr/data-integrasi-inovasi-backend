import { Router, Request, Response, NextFunction } from "express";
import { authenticate } from "../../middleware/authenticate";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

const router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.get("/", authenticate, (req: Request, res: Response, next: NextFunction) => {
  return userController.getUsers(req, res, next);
});

router.get("/profile", authenticate, (req: Request, res: Response, next: NextFunction) => {
  return userController.getProfile(req, res, next);
});

router.post("/register", (req: Request, res: Response) => {
  return userController.createUser(req, res);
});

router.post("/login", (req: Request, res: Response) => {
  return userController.loginUser(req, res);
});

router.post("/logout", authenticate, (req: Request, res: Response) => {
  return userController.logoutUser(req, res);
});

export default router;
