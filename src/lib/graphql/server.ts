import { ApolloServer } from "@apollo/server";
import { Context } from "../prisma/context";
import { schema } from './schema'

const server = new ApolloServer<Context>({
  schema,
  introspection: process.env.NODE_ENV !== 'production',
});

export default server
