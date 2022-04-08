import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import * as Mongoose from "mongoose";

//Environment variables Setups for mongodb
require("dotenv").config();

// async function to bootstrap my application
async function startServer() {
  require("dotenv").config(__dirname + ".env");

  const schema = await buildSchema({
    resolvers: [],// resolvers coming here
    emitSchemaFile: true,
  });

  const app = Express();

  const MONGO_USER = process.env.MONGODB_USER;
  const MONGO_PASS = process.env.MONGODB_PASS;

  Mongoose.connect(
    `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.k603m.mongodb.net/test`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
  )
    .then((res) => {
      console.log("Mongodb is connected successfully");

      const server = new ApolloServer({
        schema,
        context: () => ({

        }),
      });

      server.applyMiddleware({ app });
      const PORT = process.env.PORT;
      app.listen(PORT, () => {
        console.log(`server is running on PORT ${PORT}`);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

startServer();