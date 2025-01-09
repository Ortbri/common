import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import Footer from '../pages/web/nav/footer';
import Header from '../pages/web/nav/header';
import { ThemeProvider } from '../provider/theme-provider';
import { Toaster } from 'sonner';
import { TooltipProvider } from '../components/ui/tooltip';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Drawlings',
  description: '2D design drawings for architecture students',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased`}>
        <ThemeProvider>
          <Header />
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
