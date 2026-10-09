import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ClerkWrapper } from '@/components/ClerkWrapper';

export const metadata: Metadata = {
  title: 'Our Weekend • Weekend Date Planner for Couples in Addis Ababa',
  description: 'The romantic weekend date planner for busy couples in Addis Ababa, Ethiopia. Curated weekend events, best restaurants, dessert houses and coffee roasteries with interactive maps and reminders.',
  applicationName: 'Our Weekend',
  appleWebApp: {
    capable: true,
    title: 'Our Weekend',
    statusBarStyle: 'black-translucent'
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    shortcut: '/favicon.svg'
  },
  manifest: '/manifest.json',
  formatDetection: {
    telephone: true
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#0a0c13'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body>
        <ClerkWrapper>{children}</ClerkWrapper>
      </body>
    </html>
  );
}
