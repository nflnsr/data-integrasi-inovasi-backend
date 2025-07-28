import "dotenv/config";
import "module-alias/register";
import express, { type Application } from "express";
import { PORT } from "./utils/constanta";
import router from "./routes/index";
import cors from "cors";
import http from "http";

const app: Application = express();

app.use(
  cors({
    origin: "https://test-data-integrasi-inovasi-fe.vercel.app",
    credentials: true,
    preflightContinue: true,
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  })
);

app.options("*", cors({
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
  console.log("CORS middleware hit:", req.method, req.headers.origin);
  next();
});

app.use(express.json());

app.use(router);

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

const server = http.createServer(app);

const port = process.env.PORT || PORT;

server
  .listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  })
  .on("error", (err) => {
    console.error("Server error:", err.message);
  });

export default app;