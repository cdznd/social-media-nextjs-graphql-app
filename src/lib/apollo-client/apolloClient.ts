import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
// uri: 'http://localhost:3000/api/graphql',
const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: 'http://localhost:3000/api/graphql'
    }),
    cache: new InMemoryCache()
  })
}

export default createApolloClient;