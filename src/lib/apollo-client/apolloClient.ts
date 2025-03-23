import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: `${process.env.NEXT_URL}/api/graphql`
    }),
    cache: new InMemoryCache()
  })
}

export default createApolloClient;