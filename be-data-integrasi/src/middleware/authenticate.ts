import { User } from "@/routes/user/user.type";
import { verifyAccessToken } from "@/utils/jwt";
import { Request, Response, NextFunction } from "express";

declare module "express" {
  export interface Request {
    user?: User
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //   res.status(401).json({ error: "Authorization header missing or invalid" });
  //   return;
  // }

  // const token = authHeader.split(" ")[1];

  const token = req.headers.cookie?.split("; ").find(cookie => cookie.startsWith("accessToken="))?.split("=")[1];

  const user = verifyAccessToken(token!);

  console.log("Authenticated user:", user);

  req.user = user as User;

  if (user === null) {
    res.status(401).json({ error: "Invalid token" });
    return;
  }
  next();
};
