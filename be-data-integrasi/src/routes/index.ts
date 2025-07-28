import user from "./user"
import permission from "./permission"
import role from "./role"
import { Router } from "express";

const router = Router();

router.use("/api/user", user);
router.use("/api/permission", permission);
router.use("/api/role", role);

export default router;