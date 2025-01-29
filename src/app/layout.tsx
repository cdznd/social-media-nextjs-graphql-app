import type { Metadata } from "next";

// Google Fonts
import { Geist, Geist_Mono } from "next/font/google";

// App Session Provider
import AppSessionProvider from "@/components/AppSessionProvider/AppSessionProvider";

// App MUI Components
import AppTheme from "@/components/shared-theme/AppTheme";
import { CssBaseline } from "@mui/material";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const props = {}
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppTheme {...props}>
          <CssBaseline enableColorScheme />
          <AppSessionProvider>
            {children}
          </AppSessionProvider>
        </AppTheme>
      </body>
    </html>
  );
}
