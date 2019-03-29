import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";
import { resolvers, typeDefs } from "./schema";
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

const gqlserver = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

// resolve b4 others
gqlserver.applyMiddleware({ app });

applyMiddleware(middleware, app);
applyRoutes(routes, app);
applyMiddleware(errorHandlers, app);

const { PORT = 3000 } = process.env;
const server = http.createServer(app);

server.listen(PORT, () =>
  console.log(`🚀 Server is running http://localhost:${PORT}...`),
);

// module.exports.http = serverless(app);
// exports.http = functions.https.onRequest(app);
// module.exports = app;
