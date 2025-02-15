"use client";

import { ApolloProvider } from "@apollo/client";
import createApolloClient from "@/lib/apollo-client/apolloClient";
import { CssBaseline } from "@mui/material";
import AppSessionProvider from "@/components/AppSessionProvider";

import AppTheme from "../common/AppTheme";

export default function ClientProviders({ children }: { children: React.ReactNode }) {

  const apolloClient = createApolloClient()

  return (
    <ApolloProvider client={apolloClient}>
      <AppTheme>
        <CssBaseline enableColorScheme />
        <AppSessionProvider>
            {children}
        </AppSessionProvider>
      </AppTheme>
    </ApolloProvider>
  );
}
