import { createServer } from "http";
import { createSchema, createYoga } from "graphql-yoga";
import { typeDefs } from "./graphql/typedefs";
import { resolvers } from "./graphql/resolvers";
require("dotenv").config();

import db from "./models/";

const schema = createSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga({
  schema,
});

let port = process.env.PORT || 3000;
const server = createServer(yoga);
db.sequelize.sync().then(() => {
  server.listen(port, () => {
    console.info(`Server is running on http://localhost:${port}/graphql`);
  });
});
