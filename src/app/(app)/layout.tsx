import Navbar from "@/components/Navbar";
import Container from '@mui/material/Container';
import Footer from "@/components/Footer";

export default async function AppLayout({
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
        sx={{ display: 'flex', flexDirection: 'column', mt: 16, mb: 4, gap: 4 }}
      >
        {children}
      </Container>
      <Footer />
    </>
  );
}
