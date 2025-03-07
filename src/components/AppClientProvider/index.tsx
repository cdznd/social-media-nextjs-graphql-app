"use client"
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "@/lib/apollo-client/apolloClient";
import AppSessionProvider from "@/components/AppSessionProvider";

/**
 * Read about Supported Pattern: Passing Server Components to Client Components as Props
 * https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#unsupported-pattern-importing-server-components-into-client-components
 */

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const apolloClient = createApolloClient()
  return (
    <ApolloProvider client={apolloClient}>
        <AppSessionProvider>
            {children}
        </AppSessionProvider>
    </ApolloProvider>
  );
}
