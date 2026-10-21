import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import CustomCursor from '@/components/animations/CustomCursor';
import LoadingScreen from '@/components/animations/LoadingScreen';
import SmoothScroll from '@/components/animations/SmoothScroll';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Infinity Tech | Premium Digital Engineering Agency',
  description: 'Infinity Tech delivers world-class web development, custom software, and digital experiences. Modern, professional, and performance-driven solutions.',
  keywords: ['Infinity Tech', 'Web Development Agency', 'Next.js Expert', 'UI/UX Design', 'Full-stack Development'],
  authors: [{ name: 'Infinity Tech' }],
  openGraph: {
    title: 'Infinity Tech | Premium Digital Engineering Agency',
    description: 'Transforming ideas into high-performance digital realities.',
    url: 'https://infinitytech.io',
    siteName: 'Infinity Tech',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Infinity Tech | Digital Agency',
    description: 'Modern solutions for ambitious brands.',
    images: ['/og-image.jpg'],
  },
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <body className={`${inter.className} bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary`}>
        <LoadingScreen />
        <CustomCursor />
        <SmoothScroll>
          <Navbar />
          <main className="relative min-h-screen">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Infinity Tech",
              "url": "https://infinitytech.io",
              "logo": "https://infinitytech.io/logo/logo.png",
              "sameAs": [
                "https://www.instagram.com/its_infinity_tech/",
                "https://www.facebook.com/profile.php?id=61590980911003"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+92-318-1935228",
                "contactType": "customer service",
                "email": "a8infinitytech@gmail.com"
              }
            })
          }}
        />
      </body>
    </html>
  );
}
