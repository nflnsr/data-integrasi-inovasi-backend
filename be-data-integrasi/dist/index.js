"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const constanta_1 = require("./utils/constanta");
const index_1 = __importDefault(require("./routes/index"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "https://test-data-integrasi-inovasi-fe.vercel.app",
    credentials: true,
    preflightContinue: true,
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
}));
app.options("*", (0, cors_1.default)({
    origin: "https://test-data-integrasi-inovasi-fe.vercel.app",
    credentials: true,
}));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://test-data-integrasi-inovasi-fe.vercel.app");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
app.use((req, res, next) => {
    console.log("CORS middleware hittt:", req.method, req.headers.origin);
    next();
});
app.use(express_1.default.json());
app.use(index_1.default);
app.get("/", (req, res) => {
    res.send("Welcome to the API");
});
const server = http_1.default.createServer(app);
const port = process.env.PORT || constanta_1.PORT;
server
    .listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
    .on("error", (err) => {
    console.error("Server error:", err.message);
});
exports.default = app;
