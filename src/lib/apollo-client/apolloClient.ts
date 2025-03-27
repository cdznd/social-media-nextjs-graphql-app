import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const baseUrl = process.env?.NEXT_URL ?? 'localhost:3000'
const apolloUrl = `http://${baseUrl}/api/graphql`

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: apolloUrl
    }),
    cache: new InMemoryCache()
  })
}

export default createApolloClient;