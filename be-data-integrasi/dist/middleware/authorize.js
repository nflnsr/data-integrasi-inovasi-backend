"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const authorize = (requiredRole) => (req, res, next) => {
    const userRole = req.user?.roles;
    if (!userRole) {
        return res.status(403).json({ error: "Access denied. No role provided." });
    }
    if (userRole.includes(requiredRole) || userRole.includes("Admin")) {
        return next();
    }
    return res.status(403).json({ error: "Access denied. Insufficient permissions." });
};
exports.authorize = authorize;
