import compression from "compression";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import express from "express";
import fs from "fs";
import path from "path";
import { resolvers } from "./resolvers/resolver.resolver";
// security packages
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import hpp from "hpp";
import xss from "xss-clean";

// Import Routes

import { ApolloServer } from "apollo-server-express";

// -------------------------------------------- creating custom token for morgan -----------------------------------------

//Starting express
const app = express();

// load env file
dotenv.config();

const PORT = process.env.PORT;

app.use(cors({ origin: "*" }));

app.use(express.json());

//Adding the cookieParser middleware so in our req we can access to req.cookie
app.use(cookieParser());

//Preventing XSS attackes to database
app.use(xss());

//Setting up the rateLimitter

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10000, // limit each IP to 10000 requests per windowMs
});

app.use(limiter);

//setting up the hpp security
app.use(hpp());

app.use(compression());

const typeDefs = fs.readFileSync(
  path.join(__dirname, "..", "..", "graphql", "schema.graphql"),
  {
    encoding: "utf-8",
  }
);
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});
apolloServer.start().then((apollo) => {
  apolloServer.applyMiddleware({
    app,
    path: "/graphql",
  });
  const server = app.listen(PORT, () => {
    console.log("server running on port " + PORT);
    console.log("apollo server running on address" + " " + PORT + "/graphql");
  });
  process.on("unhandledRejection", async (err: Error, promise) => {
    console.error(err);
    console.error(`Error is ${err.message}`);
    server.close(() => {
      process.exit(1);
    });
  });
});
