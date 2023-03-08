// import resolvers from "./resolvers";
// import schema from "./schema";
// import { graphqlHTTP } from "express-graphql";
const resolvers = require("./resolvers");
const schema = require("./schema");
const { graphqlHTTP } = require("express-graphql");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Up and runnig with GraphQL");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

const root = { lco: () => console.log("Hey there") };

app.listen(8080, () => console.log(`Running at 8080`));

/**
 * Schema
 * Resolver
 * Config
 */
