import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const apolloUrl = process.env.VERCEL_URL ?
  `https://${process.env.VERCEL_URL}/api/graphql` :
  `http://${process.env.NEXT_URL}/api/graphql`

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