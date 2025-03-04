import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from '../components/ui/sonner';
import { TooltipProvider } from '../components/ui/tooltip';
import QueryProvider from '../provider/QueryProvider';
import { ThemeProvider } from '../provider/theme-provider';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Our Common Project - Free DWG Assets for Architects and Designers',
  description:
    'Download free DWG assets for your projects. Featuring a wide variety of CAD blocks, details, and drawings for architects and designers. Enhance your designs with our high-quality resources.',
  keywords: [
    'DWG assets',
    'CAD blocks',
    'architectural drawings',
    'free DWG',
    'design resources',
    'architects',
    'designers',
    'CAD details',
  ],
  // openGraph: {
  //   title: 'Common Project - Free DWG Assets for Architects and Designers',
  //   description:
  //     'Download free DWG assets for your projects. Featuring a wide variety of CAD blocks, details, and drawings for architects and designers.',
  //   url: 'https://your-website-url.com', // Replace with your actual URL
  //   siteName: 'Common Project',
  //   images: [
  //     {
  //       url: 'https://your-website-url.com/og-image.jpg', // Replace with your actual OG image URL
  //       width: 1200,
  //       height: 630,
  //       alt: 'Common Project - Free DWG Assets',
  //     },
  //   ],
  //   type: 'website',
  // },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'Common Project - Free DWG Assets for Architects and Designers',
  //   description:
  //     'Download free DWG assets for your projects. Featuring a wide variety of CAD blocks, details, and drawings for architects and designers.',
  //   images: ['https://your-website-url.com/twitter-image.jpg'], // Replace with your actual Twitter image URL
  // },
  // Add other relevant meta tags as needed
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <QueryProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </QueryProvider>
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
