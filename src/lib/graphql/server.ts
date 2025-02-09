import { ApolloServer } from "@apollo/server";
import { Context } from "../prisma/context";
import { schema } from './schema'

const server = new ApolloServer<Context>({ schema });

export default server
