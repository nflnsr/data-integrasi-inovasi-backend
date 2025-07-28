"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jwt_1 = require("@/utils/jwt");
const authenticate = (req, res, next) => {
    // if (!authHeader || !authHeader.startsWith("Bearer ")) {
    //   res.status(401).json({ error: "Authorization header missing or invalid" });
    //   return;
    // }
    // const token = authHeader.split(" ")[1];
    const token = req.headers.cookie?.split("; ").find(cookie => cookie.startsWith("accessToken="))?.split("=")[1];
    const user = (0, jwt_1.verifyAccessToken)(token);
    console.log("Authenticated user:", user);
    req.user = user;
    if (user === null) {
        res.status(401).json({ error: "Invalid token" });
        return;
    }
    next();
};
exports.authenticate = authenticate;
