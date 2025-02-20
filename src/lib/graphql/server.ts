import { ApolloServer } from "@apollo/server";
import depthLimit from 'graphql-depth-limit';
import { Context } from "../prisma/context";
import { schema } from './schema'

import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";

const server = new ApolloServer<Context>({
  schema,
  introspection: process.env.NODE_ENV !== 'production', // Hides schema details
  validationRules: [depthLimit(5)],
  plugins: process.env.NODE_ENV === 'production' 
    ? [ApolloServerPluginLandingPageDisabled()] // Disable Graphql Playground
    : [],
  formatError: (err) => {
    if (process.env.NODE_ENV === 'production') {
      return new Error('Internal Server Error');
    }
    return err;
  },
});

export default server
