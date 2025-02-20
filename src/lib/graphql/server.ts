import { ApolloServer } from "@apollo/server";
import depthLimit from 'graphql-depth-limit';
import { Context } from "../prisma/context";
import { schema } from './schema'

const server = new ApolloServer<Context>({
  schema,
  introspection: process.env.NODE_ENV !== 'production',
  validationRules: [depthLimit(5)],
  formatError: (err) => {
    if (process.env.NODE_ENV === 'production') {
      return new Error('Internal Server Error');
    }
    return err;
  },
});

export default server
