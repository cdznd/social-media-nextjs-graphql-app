import { ApolloClient, InMemoryCache } from '@apollo/client';

// const client = new ApolloClient({
//   uri: 'http://localhost:3000/api/graphql',
//   cache: new InMemoryCache(),
// });

const createApolloClient = () => {
  return new ApolloClient({
    uri: 'http://localhost:3000/api/graphql',
    cache: new InMemoryCache()
  })
}

export default createApolloClient;