"use client"
import { useSession } from "next-auth/react";

import Navbar from "@/components/Navbar";
import Container from '@mui/material/Container';

import Footer from "@/components/blog/components/Footer";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        {children}
      </Container>
      <Footer />
    </>
  );
}
