"use client"
import { useSession } from "next-auth/react";

// New
import Navbar from "@/components/navbar";
// MUI Material
import Container from '@mui/material/Container';
import MainContent from "@/components/blog/components/MainContent";
import Latest from "@/components/blog/components/Latest";
import Footer from "@/components/blog/components/Footer";

export default function Home() {

  // const { data: session } = useSession();

  return (
    <>
      <Navbar />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <MainContent />
        <Latest />
      </Container>
      <Footer />
    </>
  );
}
