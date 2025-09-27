import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import SessionProvider from '../components/SessionProvider';
import Navbar from '../components/Navbar';
import { ThemeToggle } from '@/components/theme-toggle';

export const metadata: Metadata = {
  title: 'Poseidon Global Maritime University LMS',
  description: 'Learning Management System for Maritime Security Education',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    var t = localStorage.getItem('poseidon-theme');
    if (t === 'light') document.documentElement.dataset.theme = 'light';
  } catch(e){}
})();`,
          }}
        />
      </head>
      <body className="relative min-h-screen overflow-x-hidden">
        <div className="fixed inset-0 -z-50 bg-poseidon-base" />
        <div className="fixed inset-0 -z-40 gradient-overlay" />
        <div className="absolute top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <div className="relative min-h-screen">
          <SessionProvider>
            <Navbar />
            {children}
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}
