import dotenv from "dotenv";
import express from "express";
import http from "http";
import middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";
import routes from "./services";
import { applyMiddleware, applyRoutes } from "./utils";

dotenv.config();

process.on("uncaughtException", (e) => {
  console.log(e);
  process.exit(1);
});

process.on("unhandledRejection", (e) => {
  console.log(e);
  process.exit(1);
});

const app = express();

applyMiddleware(middleware, app);
applyRoutes(routes, app);
applyMiddleware(errorHandlers, app);

const { PORT = 3000 } = process.env;
const server = http.createServer(app);

server.listen(PORT, () =>
  console.log(`🚀 Server is running http://localhost:${PORT}...`),
);
