"use client";

import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apolloClient";
import { CssBaseline } from "@mui/material";
import AppSessionProvider from "@/components/AppSessionProvider";
import AppTheme from "@/components/shared-theme/AppTheme";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <AppTheme>
        <CssBaseline enableColorScheme />
        <AppSessionProvider>
            {children}
        </AppSessionProvider>
      </AppTheme>
    </ApolloProvider>
  );
}
