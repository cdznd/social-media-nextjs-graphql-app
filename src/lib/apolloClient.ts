import { ApolloClient, InMemoryCache } from '@apollo/client';

const createApolloClient = () => {
  return new ApolloClient({
    // ssrMode: true,
    uri: 'http://localhost:3000/api/graphql',
    cache: new InMemoryCache()
  })
}

export default createApolloClient;